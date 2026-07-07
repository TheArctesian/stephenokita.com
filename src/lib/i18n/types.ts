// A flat dictionary: dot-notation key → display string. Flat keys keep the
// en-US spelling-override merge a trivial one-level spread and make the
// runtime lookup a plain object access.
export type Dict = Record<string, string>;
