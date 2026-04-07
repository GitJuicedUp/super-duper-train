"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsvLine = parseCsvLine;
exports.parseCsvContent = parseCsvContent;
exports.parseCsvFile = parseCsvFile;
/**
 * Minimal RFC 4180-compliant CSV parser that handles quoted fields containing commas.
 */
function parseCsvLine(line) {
    const fields = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            }
            else {
                inQuotes = !inQuotes;
            }
        }
        else if (ch === "," && !inQuotes) {
            fields.push(current);
            current = "";
        }
        else {
            current += ch;
        }
    }
    fields.push(current);
    return fields;
}
function parseCsvContent(content) {
    const lines = content.trim().split("\n");
    // Skip header row
    const rows = lines.slice(1);
    return rows.map((line) => {
        const cols = parseCsvLine(line);
        return {
            releaseOrder: parseInt(cols[0], 10),
            cardId: cols[1],
            title: cols[2],
            subtitle: cols[3],
            baseOrFoil: cols[4],
            rarity: cols[5],
            category: cols[6],
            tier: parseInt(cols[7], 10),
            pullRateStandard: parseFloat(cols[8]),
            pullRatePremium: parseFloat(cols[9]),
            acquisitionMethod: cols[10],
            pool: cols[11],
            statBoost: cols[12],
            relatedCards: cols[13]?.trim() || null,
        };
    });
}
function parseCsvFile(filePath) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    const content = fs.readFileSync(filePath, "utf-8");
    return parseCsvContent(content);
}
