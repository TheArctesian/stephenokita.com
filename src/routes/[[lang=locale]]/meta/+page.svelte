<script lang="ts">
    import "../../../app.css";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { fade } from "svelte/transition";
    import Hero from "$lib/components/shared/hero.svelte";
    import Section from "$lib/components/shared/section.svelte";
    import Seo from "$lib/components/seo/seo.svelte";
    import Colophon from "./colophon.svelte";
    import RssRow from "./rss_row.svelte";
    import WatchCard from "./watch_card.svelte";
    import RequestHeaders from "./request_headers.svelte";
    import TrackerItem from "./tracker_item.svelte";
    import FingerprintBanner from "./fingerprint_banner.svelte";
    import FingerprintResults from "./fingerprint_results.svelte";
    import PosthogReplay from "./posthog_replay.svelte";
    import PosthogFeed from "./posthog_feed.svelte";
    import PosthogProfile from "./posthog_profile.svelte";
    import VisitorTwin from "./visitor_twin.svelte";
    import { collectFingerprint } from "./fingerprint";
    import { t } from "$lib/i18n";
    import type { PageData } from "./$types";

    export let data: PageData;

    // ── Peel-back state ──────────────────────────────────────────────
    // The page reveals in layers: server data is there on load, the deep
    // client fingerprint only runs once the visitor asks for it.
    let revealed = false;
    let collecting = false;
    let fp: any = null;
    let fingerprintHash = "";
    let canvasImage = "";

    // PostHog "feed it your fingerprint" state.
    let linkedInPostHog = false;
    let profileRef: PosthogProfile;
    let twinRef: VisitorTwin;

    // ── Live trackers ────────────────────────────────────────────────
    let trackers: {
        posthog: {
            active: boolean;
            distinctId: string | null;
            sessionId: string | null;
            recording: boolean;
            replayUrl: string | null;
        };
        umami: boolean;
        vercel: boolean;
    } = {
        posthog: {
            active: false,
            distinctId: null,
            sessionId: null,
            recording: false,
            replayUrl: null,
        },
        umami: false,
        vercel: false,
    };

    // RSS copy
    let copyStatus = "";
    let copyTimeout: ReturnType<typeof setTimeout>;

    const g = data.server.geo;
    $: geoLine = [g.city, g.region, g.country].filter(Boolean).join(", ");

    // PostHog id rows for the tracker inspector.
    $: posthogIds = [
        trackers.posthog.distinctId && {
            key: "distinct_id",
            value: trackers.posthog.distinctId,
        },
        trackers.posthog.sessionId && {
            key: "session_id",
            value: trackers.posthog.sessionId,
        },
        trackers.posthog.replayUrl && {
            key: "replay",
            value: "this session is being recorded",
        },
    ].filter(Boolean) as { key: string; value: string }[];

    onMount(() => {
        detectTrackers();
    });

    function detectTrackers() {
        if (!browser) return;
        const ph: any = (window as any).posthog;
        // The dev stub only has `capture`; the real SDK has these getters.
        const phLive = ph && typeof ph.get_distinct_id === "function";
        if (phLive) {
            try {
                const recording =
                    typeof ph.sessionRecordingStarted === "function"
                        ? ph.sessionRecordingStarted()
                        : false;
                trackers.posthog = {
                    active: true,
                    distinctId: ph.get_distinct_id?.() ?? null,
                    sessionId: ph.get_session_id?.() ?? null,
                    recording,
                    replayUrl:
                        recording &&
                        typeof ph.get_session_replay_url === "function"
                            ? ph.get_session_replay_url()
                            : null,
                };
            } catch {
                trackers.posthog = { ...trackers.posthog, active: true };
            }
        } else if (ph) {
            // Stub present (local dev) — say so honestly.
            trackers.posthog = { ...trackers.posthog, active: false };
        }

        trackers.umami =
            typeof (window as any).umami !== "undefined" ||
            !!document.querySelector("script[data-website-id]");
        trackers.vercel =
            !!document.querySelector('script[src*="/_vercel/insights"]') ||
            !!document.querySelector('script[src*="va.vercel-scripts"]') ||
            typeof (window as any).va !== "undefined";
        trackers = trackers;
    }

    async function reveal() {
        revealed = true;
        if (fp) return;
        collecting = true;
        try {
            const result = await collectFingerprint();
            fp = result.details;
            fingerprintHash = result.hash;
            canvasImage = fp.canvasFingerprint;
        } catch (e) {
            console.error("fingerprint error", e);
        } finally {
            collecting = false;
        }
    }

    function identifyInPostHog() {
        if (!browser || !fp || !fingerprintHash) return;
        const ph: any = (window as any).posthog;
        if (!ph || typeof ph.identify !== "function") return;
        const traits = {
            fingerprint: fingerprintHash,
            platform: fp.platform,
            timezone: fp.timezone,
            language: fp.language,
            screen: `${fp.screen.width}x${fp.screen.height}`,
            gpu: fp.gpu?.renderer ?? null,
            fonts: fp.fonts?.length ?? null,
        };
        ph.identify(fingerprintHash, traits);
        if (typeof ph.capture === "function") {
            ph.capture("meta_fingerprint_revealed", traits);
        }
        linkedInPostHog = true;
        trackers.posthog.distinctId = fingerprintHash;
        trackers = trackers;
        // Re-pull the profile + similarity once PostHog has ingested the event.
        setTimeout(() => {
            profileRef?.refresh();
            twinRef?.refresh();
        }, 4000);
    }

    async function copyRss() {
        try {
            await navigator.clipboard.writeText(
                "https://stephenokita.com/rss.xml",
            );
            copyStatus = "copied";
            if (copyTimeout) clearTimeout(copyTimeout);
            copyTimeout = setTimeout(() => (copyStatus = ""), 2000);
        } catch {
            copyStatus = "failed";
        }
    }
</script>

<!-- A live diagnostics page whose content differs per visitor. It has nothing
     to rank for and would only dilute the site's index, so it is noindex. -->
<Seo
    title={$t("meta.pageTitle")}
    description={$t("meta.pageDescription")}
    canonicalPath="/meta"
    noindex
/>

<div class="page-shell">
    <Hero title={$t("meta.heroTitle")} subtitle={$t("meta.heroSubtitle")} />

    <!-- ── Colophon ────────────────────────────────────────────────── -->
    <Section label={$t("meta.section.built")}>
        <Colophon />
    </Section>

    <!-- ── RSS ─────────────────────────────────────────────────────── -->
    <Section label={$t("meta.section.rss")}>
        <RssRow {copyStatus} onCopy={copyRss} />
    </Section>

    <!-- ── What I already know ─────────────────────────────────────── -->
    <Section label={$t("meta.section.know")}>
        <div class="watch-grid">
            <WatchCard
                key={$t("meta.card.ip")}
                value={data.server.ip ?? $t("meta.card.ipHidden")}
                note={$t("meta.card.ipNote")}
            />

            <WatchCard
                key={$t("meta.card.location")}
                value={geoLine || $t("meta.card.locationUnresolved")}
            >
                {#if data.server.hasGeo}
                    {$t("meta.card.locationResolved")}
                {:else}
                    {$t("meta.card.locationDev")}
                {/if}
            </WatchCard>

            {#if g.timezone}
                <WatchCard key={$t("meta.card.timezone")} value={g.timezone} />
            {/if}

            {#if g.latitude && g.longitude}
                <WatchCard
                    key={$t("meta.card.coordinates")}
                    value={`${g.latitude}, ${g.longitude}`}
                    note={$t("meta.card.coordinatesNote")}
                />
            {/if}
        </div>

        <!-- Request headers the browser sent -->
        {#if data.server.spotlight.length > 0}
            <RequestHeaders
                spotlight={data.server.spotlight}
                allHeaders={data.server.allHeaders}
                headerCount={data.server.headerCount}
            />
        {/if}
    </Section>

    <!-- ── Peel back: the deep fingerprint ─────────────────────────── -->
    <Section label={$t("meta.section.frontDoor")}>
        <p class="prose">
            {$t("meta.frontDoor.blurb")}
        </p>

        {#if !revealed}
            <button class="reveal-btn" on:click={reveal}>
                {$t("meta.frontDoor.revealBtn")}
            </button>
        {:else if collecting}
            <p class="collecting">{$t("meta.frontDoor.collecting")}</p>
        {:else if fp}
            <div in:fade={{ duration: 300 }}>
                <FingerprintBanner hash={fingerprintHash} {canvasImage} />
                <FingerprintResults {fp} />
            </div>
        {/if}
    </Section>

    <!-- ── Who else is watching ────────────────────────────────────── -->
    <Section label={$t("meta.section.watching")}>
        <span slot="meta" class="watching-meta">{$t("meta.watching.live")}</span
        >
        <p class="prose">
            {$t("meta.watching.blurb")}
        </p>

        <div class="tracker-list">
            <TrackerItem
                name="PostHog"
                active={trackers.posthog.active}
                state={trackers.posthog.active
                    ? $t("meta.tracker.posthog.tracking")
                    : $t("meta.tracker.posthog.stubbed")}
                ids={trackers.posthog.active ? posthogIds : []}
            >
                {#if trackers.posthog.recording}
                    {@html $t("meta.tracker.posthog.descRecording")}
                {:else}
                    {@html $t("meta.tracker.posthog.desc")}
                {/if}
            </TrackerItem>

            <TrackerItem
                name="Umami"
                active={trackers.umami}
                state={trackers.umami
                    ? $t("meta.tracker.loaded")
                    : $t("meta.tracker.notDetected")}
            >
                {$t("meta.tracker.umami.desc")}
            </TrackerItem>

            <TrackerItem
                name="Vercel Analytics + Speed Insights"
                active={trackers.vercel}
                state={trackers.vercel
                    ? $t("meta.tracker.loaded")
                    : $t("meta.tracker.notDetected")}
            >
                {$t("meta.tracker.vercel.desc")}
            </TrackerItem>
        </div>

        <!-- ── PostHog, up close ─────────────────────────────────── -->
        <div class="posthog-closeup">
            <h3 class="closeup-title">{$t("meta.closeup.title")}</h3>

            <PosthogReplay
                recording={trackers.posthog.recording}
                replayUrl={trackers.posthog.replayUrl}
            />

            <p class="closeup-label">{$t("meta.closeup.stream")}</p>
            <PosthogFeed active={trackers.posthog.active} />

            <p class="closeup-label">{$t("meta.closeup.teach")}</p>
            {#if !fp}
                <p class="closeup-hint">
                    {$t("meta.closeup.needFingerprint")}
                </p>
            {:else if !trackers.posthog.active}
                <p class="closeup-hint">
                    {$t("meta.closeup.stubbed")}
                </p>
            {:else if linkedInPostHog}
                <p class="closeup-hint linked">
                    {@html $t("meta.closeup.linked")}
                </p>
            {:else}
                <button class="reveal-btn" on:click={identifyInPostHog}>
                    {$t("meta.closeup.handBtn")}
                </button>
            {/if}

            {#if trackers.posthog.active}
                <p class="closeup-label">{$t("meta.closeup.has")}</p>
                <PosthogProfile
                    bind:this={profileRef}
                    distinctId={trackers.posthog.distinctId}
                />

                <p class="closeup-label">{$t("meta.closeup.remind")}</p>
                <p class="closeup-hint">
                    {$t("meta.closeup.remindBlurb")}
                </p>
                <VisitorTwin
                    bind:this={twinRef}
                    distinctId={trackers.posthog.distinctId}
                />
            {/if}
        </div>
    </Section>
</div>

<style>
    .prose {
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        line-height: 1.7;
        margin: 0 0 var(--space-lg);
        max-width: 62ch;
    }

    /* ── Watch grid (the "I see you" cards) ── */
    .watch-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
        gap: var(--space-sm);
    }

    /* ── Reveal button ── */
    .reveal-btn {
        display: inline-block;
        padding: var(--space-sm) var(--space-lg);
        background: transparent;
        border: 1px solid var(--accent-primary);
        border-radius: var(--radius-md);
        color: var(--accent-primary);
        font-family: var(--font-family-mono);
        font-size: var(--font-size-sm);
        cursor: pointer;
        transition: all var(--transition-fast);
    }

    .reveal-btn:hover {
        background: var(--accent-primary);
        color: var(--bg-primary);
    }

    .collecting {
        color: var(--text-tertiary);
        font-family: var(--font-family-mono);
        font-size: var(--font-size-sm);
    }

    /* ── Trackers ── */
    .watching-meta {
        color: var(--status-warning);
    }

    .tracker-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    /* ── PostHog close-up ── */
    .posthog-closeup {
        margin-top: var(--space-xl);
        padding-top: var(--space-lg);
        border-top: 1px solid var(--border-primary);
    }

    .closeup-title {
        font-family: var(--font-family-mono);
        font-size: var(--font-size-sm);
        color: var(--status-error);
        margin: 0 0 var(--space-md);
    }

    .closeup-label {
        font-family: var(--font-family-mono);
        font-size: var(--font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--accent-secondary);
        margin: var(--space-lg) 0 var(--space-sm);
    }

    .closeup-hint {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
        line-height: 1.6;
        margin: 0;
    }

    .closeup-hint.linked {
        color: var(--text-secondary);
    }

    .closeup-hint code {
        font-family: var(--font-family-mono);
        font-size: var(--font-size-xs);
        color: var(--status-success);
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    }
</style>
