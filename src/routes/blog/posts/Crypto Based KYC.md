---
title: Decentralised KYC & DIDs
description: Finally a tech article. Exploring user verification in an anonymous and decentralised social network. Pretty much anti-corruption of DAOs.
date: "2025-03-27"
location: Berkeley
categories:
  - CS
  - cybersecurity
  - Philosophy
  - Blockchain
  - DAO
  - Identity
published: true
language:
  - English
---

Know Your Customer (KYC) is becoming more and more common for all applications. It has become integral for all fin-tech apps and even for social media apps, to verify the customer's identity. This all came about because anonymity is dangerous. Going back to Plato's Republic there is a dialogue in the first or second book where Socrates and Glaucon are discussing morality. Glaucon imagines someone having the Ring of Gyges, a Lord of the Rings-like ring that allows you to become completely invisible. If you were completely invisible what would you do? I have asked this question to a lot of people and the most common answers are steal, stalk, break and enter... These are all things that if there were social repercussions you would never do. Plato rejects this, he is an idealist and IMO the shit you need to sift through to get to Socrates. This idea is powerful as it sees morality not as something inherent but culturally induced. On the internet people can hide behind a nametag; you can say and do all types of things without any repercussions because you and your interlocutor are both anonymous, almost inhuman. To enforce a moral code universally you need a stick and a carrot. While this can be up and down votes, social sentiment is incredibly weak when anonymous. Thus KYC.

KYC is first of all really easy to cheat; its modern implementation is riddled with loopholes and is under constant development. I don't think the companies doing this are stupid, but a truly secure KYC would be too much to ask from the user.

The core challenge of any KYC system is twofold: verifying that a user exists as a real person, and confirming that the person operating the system is indeed that verified individual. This is easy for large apps as they really only need to focus on the first one, and can leave the secondary part to traditional user verification (also very weak). I want to look at KYC frameworks when anonymity is needed, specifically Decentralised Autonomous Organisations (DAOs).

DAOs have no central authority structure and work by voting with governance tokens. Governance tokens are an interesting problem, depending on which ERC standard you use there can still be inequalities in the DAO management. For example, one actor could collect 51% of governance tokens and autocratically manage the whole network. Additionally, we run into the problem of KYC user validation. For advanced DAOs we need to know this person is (1) real and (2) the one using it.

## Person Verification

Traditional KYC typically relies on government-issued documents like driver's licenses or passports. For decentralised systems, this creates a fundamental tension: how do we verify identity while maintaining privacy and independence from centralised authorities?

Self-sovereign identity (SSI) is the concept that individuals should own and control their digital identities without relying on centralised authorities. This is a beautiful idea where identity is moved from siloed, company/government-controlled systems to user-owned ones. This is reclaiming identity from the violent monopolies that currently control our selfhood.

Projects like Sovrin, uPort, and Civic have pioneered this approach, creating frameworks where identity credentials are stored in decentralised networks or users' personal wallets rather than corporate databases. The W3C Decentralized Identifiers (DIDs) specification provides standardisation for these efforts, but there is still a lot of work to be done.

Until we have wider adoption of DIDs, we won't be able to reclaim sovereignty, so a government ID mechanism would need to work. It could follow a PGP-like formula where an NFT is minted based on the encrypted value of the `BASE64` image of your government IDs; this could then be externally validated or validated based on similarity to facial scans. The public blockchain would only see random numbers, unlocked with the owner's wallet validation (private key decryption). These are known as zero-knowledge proofs, which are incredibly powerful.

Projects like Chainlink DECO are expanding this capability, allowing private off-chain data to be used in blockchain verification without exposing the underlying information.

## User Authentication

Once a person is verified as real, the system needs to continuously validate that the same person is operating the account. This is where traditional systems often fail, relying on easily compromised passwords or simple biometrics.

A robust approach would implement:

- Dynamic Facial Recognition: Rather than static image comparison, require webcam verification with changing backgrounds or prompts to prevent video spoofing. Systems could implement cosine similarity checks against previous verification sessions to detect manipulation and other checks against deepfakes.
- Limited Verification Attempts: Implementing strict limits on failed authentication attempts prevents brute-force attacks.
- Complex Authentication Chains: Combining facial recognition with complex passwords (20+ characters) and hardware keys creates multiple verification layers.
- Behavioural Identification: Tracking mouse movements, typing speed, word frequency to verify that the active user is the same. This may seem scary but this is already tracked for bot protection.

## Sybil Attack Prevention

A critical challenge in decentralised systems is preventing Sybil attacks - where one person creates multiple identities to gain disproportionate influence. BrightID addresses this through a social graph approach that maps connections between users to identify unique individuals. Proof of Humanity takes another approach, requiring video verification and social vouching, creating a registry of humans that can be referenced by other applications. This is a very cool concept but difficult to verify and easy to spoof. It would probably require an additional cross-db detection mechanism to check for similarities with other profiles; however, that brings another massive security hole of needing the chain to be able to decrypt all users.

## Enforcement Mechanisms

Without centralised authority, enforcement becomes challenging. Enforcement is a problem that you don't want to have. Ideally this system is robust enough to prevent duplicate or fake accounts; however, I can think of a couple of ways to attack the system. As usual in cyber security, mitigation is important but attack detection is even more important. When detected, there needs to be punishment such as banning or burning of the token, but this detection system needs to be perfect. If the detection is not perfect, we are stripping people of their social identity unjustly. Mitigation could include punishment such as staking, requiring users to lock away money in escrow that can be taken when a user acts badly. Reputation systems have also been proposed but it is really difficult and also classist (poor people don't have money to stake), a thing we don't want in a perfect democracy.

## Real-World Implementations

Several projects are already exploring these concepts:

- Civic: A decentralised identity verification platform using blockchain to give users control over their personal data.
- Sovrin: A global public utility for self-sovereign identity with governance that prevents any single entity from controlling the network.
- BrightID: A social identity network that uses the concept of "social graphs" to verify unique personhood.
- Proof of Humanity: A system requiring video verification and social vouching to create sybil-resistant identities.
- Chainlink DECO: Enables the use of confidential off-chain data in blockchain transactions while preserving privacy.

The future of decentralised KYC isn't just about technological solutions but about reimagining the relationship between identity, privacy, and trust in digital spaces. I might build this system some day but more so just want people to start thinking about worlds without centralised systems of power.
