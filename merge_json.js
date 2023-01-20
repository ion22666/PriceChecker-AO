import fs from "fs";

var LocalizedItems = JSON.parse(fs.readFileSync("./localized-items.json", "utf-8"));
var LocalizedItems_HashMap = {};
var LocalizedItems_HashMap1 = {};
var ArrayItems = JSON.parse(fs.readFileSync("./FINAL_ITEMS_ARRAY.json", "utf-8"));
var NewArrayItems = [];
LocalizedItems.forEach(localized_item => (LocalizedItems_HashMap[localized_item["UniqueName"]] = localized_item));
LocalizedItems.forEach(localized_item => (LocalizedItems_HashMap1[localized_item["LocalizationNameVariable"]] = localized_item));

function make_new_item(enchantment, loc_item, new_item) {
    for (const key in loc_item) {
        if (Object.hasOwnProperty.call(loc_item, key)) {
            new_item[key] = loc_item[key];
        }
    }
    for (const key in enchantment) {
        if (Object.hasOwnProperty.call(enchantment, key)) {
            new_item[key] = enchantment[key];
            delete new_item["enchantments"];
        }
    }
    return new_item;
}

ArrayItems.forEach(item => {
    let uniquename = item["@uniquename"];
    let last_symbol = uniquename[uniquename.length - 1];
    if (!item["enchantments"]) {
        if (item["@shopsubcategory1"] == "journal") {
            // MED
            let loc_item_MED = LocalizedItems_HashMap[uniquename];
            let new_item_MED = Object.assign({}, item);
            for (const key in new_item_MED) {
                if (Object.hasOwnProperty.call(new_item_MED, key)) {
                    new_item_MED[key] = loc_item_MED[key];
                }
            }
            NewArrayItems.push(new_item_MED);
            // FULL
            let loc_item_FULL = LocalizedItems_HashMap[uniquename + "_FULL"];
            let new_item_FULL = Object.assign({}, item);
            for (const key in loc_item_FULL) {
                if (Object.hasOwnProperty.call(loc_item_FULL, key)) {
                    new_item_FULL[key] = loc_item_FULL[key];
                }
            }
            NewArrayItems.push(new_item_FULL);
            // EMPTY
            let loc_item_EMPTY = LocalizedItems_HashMap[uniquename + "_EMPTY"];
            let new_item_EMPTY = Object.assign({}, item);
            for (const key in loc_item_EMPTY) {
                if (Object.hasOwnProperty.call(loc_item_EMPTY, key)) {
                    new_item_EMPTY[key] = loc_item_EMPTY[key];
                }
            }
            NewArrayItems.push(new_item_EMPTY);
        } else {
            let loc_item = LocalizedItems_HashMap1["@ITEMS_" + uniquename];
            if (uniquename == "T8_RANDOM_DUNGEON_ELITE_TOKEN_3") {
                console.log(loc_item);
            }
            for (const key in loc_item) {
                if (Object.hasOwnProperty.call(loc_item, key)) {
                    item[key] = loc_item[key];
                }
            }
        }

        NewArrayItems.push(item);
        return;
    }

    if (item["enchantments"]) {
        let enchantments = item["enchantments"]["enchantment"];
        delete item["enchantments"];

        if (Array.isArray(enchantments)) {
            enchantments.forEach(enchantment => {
                let loc_item = LocalizedItems_HashMap[uniquename + "@" + enchantment["@enchantmentlevel"]];
                let new_item = Object.assign({}, item);
                new_item = make_new_item(enchantment, loc_item, new_item);
                NewArrayItems.push(new_item);
            });
        } else {
            let new_item = Object.assign({}, item);
            let loc_item = LocalizedItems_HashMap[uniquename + "@" + enchantments["@enchantmentlevel"]];
            new_item = make_new_item(enchantments, loc_item, new_item);
            NewArrayItems.push(new_item);
        }
        item["@enchantmentlevel"] = "0";
        NewArrayItems.push(item);
    } else {
        let new_item = Object.assign({}, item);
        let loc_item = LocalizedItems_HashMap[uniquename + "@" + last_symbol];
        for (const key in loc_item) {
            if (Object.hasOwnProperty.call(loc_item, key)) {
                new_item[key] = loc_item[key];
            }
        }
        NewArrayItems.push(new_item);
    }
});
fs.writeFileSync("./ULTIMATE_ITEMS_ARRAY.json", JSON.stringify(NewArrayItems));
