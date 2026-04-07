import { parseCsvLine, parseCsvContent } from "../../utils/csvParser";

describe("parseCsvLine", () => {
  it("parses a simple comma-separated line", () => {
    expect(parseCsvLine("a,b,c")).toEqual(["a", "b", "c"]);
  });

  it("parses a single field with no commas", () => {
    expect(parseCsvLine("hello")).toEqual(["hello"]);
  });

  it("returns an empty string for an empty input", () => {
    expect(parseCsvLine("")).toEqual([""]);
  });

  it("handles empty fields", () => {
    expect(parseCsvLine("a,,c")).toEqual(["a", "", "c"]);
  });

  it("handles a trailing comma producing an empty last field", () => {
    expect(parseCsvLine("a,b,")).toEqual(["a", "b", ""]);
  });

  it("handles a leading comma producing an empty first field", () => {
    expect(parseCsvLine(",b,c")).toEqual(["", "b", "c"]);
  });

  it("strips surrounding double-quotes from a field", () => {
    expect(parseCsvLine('"hello"')).toEqual(["hello"]);
  });

  it("allows commas inside a quoted field", () => {
    expect(parseCsvLine('"hello, world",foo')).toEqual(["hello, world", "foo"]);
  });

  it("handles escaped double-quotes (RFC 4180 style) inside a quoted field", () => {
    expect(parseCsvLine('"say ""hi"""')).toEqual(['say "hi"']);
  });

  it("handles multiple quoted fields", () => {
    expect(parseCsvLine('"a,b","c,d"')).toEqual(["a,b", "c,d"]);
  });

  it("handles a realistic CSV data row", () => {
    const line = '1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy,JU-002';
    expect(parseCsvLine(line)).toEqual([
      "1", "JU-001", "Citrus Surge", "The Awakening", "Base",
      "Common", "Juice", "1", "25.00", "15.00", "Pack", "Core", "+5 Energy", "JU-002",
    ]);
  });
});

describe("parseCsvContent", () => {
  const header = "releaseOrder,cardId,title,subtitle,baseOrFoil,rarity,category,tier,pullRateStandard,pullRatePremium,acquisitionMethod,pool,statBoost,relatedCards";

  it("parses a single data row correctly", () => {
    const content = `${header}\n1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy,JU-002`;
    const rows = parseCsvContent(content);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      releaseOrder: 1,
      cardId: "JU-001",
      title: "Citrus Surge",
      subtitle: "The Awakening",
      baseOrFoil: "Base",
      rarity: "Common",
      category: "Juice",
      tier: 1,
      pullRateStandard: 25.0,
      pullRatePremium: 15.0,
      acquisitionMethod: "Pack",
      pool: "Core",
      statBoost: "+5 Energy",
      relatedCards: "JU-002",
    });
  });

  it("parses multiple data rows", () => {
    const content = [
      header,
      "1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy,JU-002",
      "2,JU-002,Citrus Surge,The Awakening,Foil,Uncommon,Juice,1,10.00,8.00,Pack,Core,+10 Energy,JU-001",
    ].join("\n");

    const rows = parseCsvContent(content);
    expect(rows).toHaveLength(2);
    expect(rows[0].cardId).toBe("JU-001");
    expect(rows[1].cardId).toBe("JU-002");
  });

  it("sets relatedCards to null when the column is absent", () => {
    const content = `${header}\n1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy,`;
    const rows = parseCsvContent(content);
    expect(rows[0].relatedCards).toBeNull();
  });

  it("sets relatedCards to null when the column is only whitespace", () => {
    const content = `${header}\n1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy,   `;
    const rows = parseCsvContent(content);
    expect(rows[0].relatedCards).toBeNull();
  });

  it("trims whitespace from relatedCards", () => {
    const content = `${header}\n1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy, JU-002 `;
    const rows = parseCsvContent(content);
    expect(rows[0].relatedCards).toBe("JU-002");
  });

  it("parses numeric fields correctly", () => {
    const content = `${header}\n7,JU-007,Power Squeeze,Maximum Output,Base,Rare,Power,2,8.00,5.00,Pack,Power,+20 Attack,JU-008`;
    const rows = parseCsvContent(content);
    expect(rows[0].releaseOrder).toBe(7);
    expect(rows[0].tier).toBe(2);
    expect(rows[0].pullRateStandard).toBe(8.0);
    expect(rows[0].pullRatePremium).toBe(5.0);
  });

  it("skips the header row and returns only data rows", () => {
    const content = `${header}\n1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy,JU-002`;
    const rows = parseCsvContent(content);
    // Should not contain a row with cardId equal to the header value
    expect(rows.every((r) => r.cardId !== "cardId")).toBe(true);
  });

  it("handles content with trailing newline", () => {
    const content = `${header}\n1,JU-001,Citrus Surge,The Awakening,Base,Common,Juice,1,25.00,15.00,Pack,Core,+5 Energy,JU-002\n`;
    const rows = parseCsvContent(content);
    expect(rows).toHaveLength(1);
  });
});
