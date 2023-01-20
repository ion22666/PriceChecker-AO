/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/app.ts":
/*!************************!*\
  !*** ./src/api/app.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middlewares_middlewares__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middlewares/middlewares */ \"./src/api/middlewares/middlewares.ts\");\n/* harmony import */ var _routes_app_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/app-router */ \"./src/api/routes/app-router.ts\");\n/* harmony import */ var _routes_api_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/api-router */ \"./src/api/routes/api-router.ts\");\n\r\n\r\n\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\r\n// Define Front Middleware Functions\r\n_middlewares_middlewares__WEBPACK_IMPORTED_MODULE_1__[\"default\"].start.forEach(middleware => app.use(...middleware));\r\n// Define routes\r\napp.use(\"/\", _routes_app_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\napp.use(\"/api\", _routes_api_router__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\r\n// Define Back middleware functions\r\n_middlewares_middlewares__WEBPACK_IMPORTED_MODULE_1__[\"default\"].end.forEach(middleware => app.use(...middleware));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/app.ts?");

/***/ }),

/***/ "./src/api/config/mongodb.ts":
/*!***********************************!*\
  !*** ./src/api/config/mongodb.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\r\nclass DB {\r\n    static _collections;\r\n    static async connect() {\r\n        let client = await mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.wgurxzm.mongodb.net/?retryWrites=true&w=majority`);\r\n        DB._collections = {\r\n            itemsArray: client.db(\"ao-items\").collection(\"items-array\"),\r\n            itemsTree: client.db(\"ao-items\").collection(\"items-tree\"),\r\n        };\r\n    }\r\n    static get collections() {\r\n        return DB._collections;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DB);\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/config/mongodb.ts?");

/***/ }),

/***/ "./src/api/config/paths.ts":
/*!*********************************!*\
  !*** ./src/api/config/paths.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RootDir\": () => (/* binding */ RootDir),\n/* harmony export */   \"StaticDir\": () => (/* binding */ StaticDir)\n/* harmony export */ });\nconst RootDir = process.cwd();\r\nconst StaticDir = RootDir + \"\\\\dist\\\\assets\\\\\";\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/config/paths.ts?");

/***/ }),

/***/ "./src/api/config/server-config.ts":
/*!*****************************************!*\
  !*** ./src/api/config/server-config.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\r\n    port: 3000,\r\n    mode: process.env.PROD ? \"production\" : \"development\",\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/config/server-config.ts?");

/***/ }),

/***/ "./src/api/controllers/api-index.ts":
/*!******************************************!*\
  !*** ./src/api/controllers/api-index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//--------------/api\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    get: (req, res) => {\r\n        res.status(200).json({\r\n            message: \"Albion Online Items API\",\r\n            content: {\r\n                \"Search Item\": \"/api/items/<unique_name || localized_name>\",\r\n                Sources: [\r\n                    \"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/formatted/items.json\",\r\n                    \"https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/items.json\",\r\n                ],\r\n            },\r\n        });\r\n    },\r\n});\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/controllers/api-index.ts?");

/***/ }),

/***/ "./src/api/controllers/api-items.ts":
/*!******************************************!*\
  !*** ./src/api/controllers/api-items.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"get_many\": () => (/* binding */ get_many),\n/* harmony export */   \"get_one\": () => (/* binding */ get_one),\n/* harmony export */   \"param_validator\": () => (/* binding */ param_validator)\n/* harmony export */ });\n/* harmony import */ var _config_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/mongodb */ \"./src/api/config/mongodb.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/api/controllers/constants.ts\");\n\r\n\r\n// const shema = (lang: string) => {\r\n//     return {\r\n//         _id: 0,\r\n//         [`LocalizedNames.${lang}`]: 1,\r\n//         [`LocalizedDescriptions.${lang}`]: 1,\r\n//         UniqueName: 1,\r\n//     };\r\n// };\r\n// {\r\n//     UniqueName: \"UNIQUE_HIDEOUT\";\r\n// }\r\n// LocalizedNames = {\r\n//     \"EN-US\": \"Hideout Construction Kit\",\r\n//     \"DE-DE\": \"Unterschlupf-Baukasten\",\r\n//     \"FR-FR\": \"Kit de construction de repaire\",\r\n//     \"RU-RU\": \"Набор для постройки убежища\",\r\n//     \"PL-PL\": \"Zestaw do budowy Kryjówki\",\r\n//     \"ES-ES\": \"Kit de construcción de escondites\",\r\n//     \"PT-BR\": \"Kit de Construção de Esconderijo\",\r\n//     \"IT-IT\": \"Kit di costruzione nascondigli\",\r\n//     \"ZH-CN\": \"藏身地堡建筑工具包\",\r\n//     \"KO-KR\": \"은신처 건설키트\",\r\n//     \"JA-JP\": \"隠れ家建設キット\",\r\n//     \"ZH-TW\": \"藏身地堡建設工具組\",\r\n//     \"ID-ID\": \"Kit Konstruksi Persembunyian\",\r\n// };\r\n//--------------/api/items\r\nconst get_one = async (req, res) => {\r\n    let item = await _config_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"].collections.itemsArray.findOne({\r\n        $or: [{ UniqueName: req.params.name }, { [`LocalizedNames.${req.params.lang}`]: req.params.name }, { \"@uniquename\": req.params.name }],\r\n    });\r\n    if (item) {\r\n        res.status(200).json({ status: \"OK\", data: item });\r\n    }\r\n    else {\r\n        res.status(404).json({ status: \"ERROR\", error: \"Item Not Found\" });\r\n    }\r\n};\r\nfunction check_param(name, value, default_value, default_mirror_values, values, int_range) {\r\n    if (!value) {\r\n        return default_value;\r\n    }\r\n    if (default_mirror_values && default_mirror_values.includes(value)) {\r\n        return default_value;\r\n    }\r\n    if (values && !values.includes(value))\r\n        throw new Error(name + \" is not acceptable\");\r\n    if (int_range) {\r\n        try {\r\n            let int_value = parseInt(value);\r\n            if (int_value < int_range[0])\r\n                throw new Error(name + \" is too small, needs to be in range: \" + int_range[0] + \"-\" + int_range[1]);\r\n            if (int_value > int_range[1])\r\n                throw new Error(name + \" is too large, needs to be in range: \" + int_range[0] + \"-\" + int_range[1]);\r\n        }\r\n        catch (e) {\r\n            throw new Error(name + \" needs to be a number\");\r\n        }\r\n    }\r\n    return value;\r\n}\r\nconst param_validator = (req, res, next) => {\r\n    let q = req.query;\r\n    try {\r\n        // Individual Checks\r\n        q.count = check_param(\"Count\", q.count?.toString(), \"10\", null, null, [1, 50]);\r\n        q.page = check_param(\"Page\", q.page?.toString(), \"0\", null, null, [0, 100]);\r\n        q.enchant = check_param(\"Enchantent\", q[\"@enchantmentlevel\"]?.toString(), \"*\", [\"all\", \"any\"], null, [0, 4]);\r\n        q.tier = check_param(\"Tier\", q.tier?.toString(), \"*\", [\"all\", \"any\"], null, [0, 8]);\r\n        q.quality = check_param(\"Quality\", q.quality?.toString(), \"1\", [\"all\", \"any\"], null, [1, 5]);\r\n        q.sort = check_param(\"Sort\", q.sort?.toString(), \"Index\", [\"all\", \"any\"], _constants__WEBPACK_IMPORTED_MODULE_1__.avalaible_sorts, null);\r\n        q.search = check_param(\"Search\", q.search?.toString(), \"\", null, null, null);\r\n        let category = (q.category = check_param(\"Category\", q.category?.toString(), \"*\", [\"all\", \"any\"], _constants__WEBPACK_IMPORTED_MODULE_1__.available_category, null));\r\n        let sub_category = (q.sub_category = check_param(\"Sub-Category\", q.sub_category?.toString(), \"*\", [\"all\", \"any\"], _constants__WEBPACK_IMPORTED_MODULE_1__.available_sub_category[category], null));\r\n        let database = (q.database = check_param(\"Database\", q.database?.toString(), \"1\", null, null, [1, 2]));\r\n        // Group Checks\r\n        if (sub_category != \"*\" && category == \"*\")\r\n            throw new Error(\"Sub-Category cannot exist without Category\");\r\n        if (database == \"2\" && (category == \"*\" || sub_category == \"*\"))\r\n            throw new Error(\"The all/any method is only available with database=1\");\r\n    }\r\n    catch (err) {\r\n        return res.status(400).json({ status: \"ERROR\", reason: err.message });\r\n    }\r\n    next();\r\n};\r\nconst get_many = async (req, res) => {\r\n    let q = req.query;\r\n    console.log(q);\r\n    let items = [];\r\n    // Read from items-array collection\r\n    if (q.database == \"1\") {\r\n        let filter = {};\r\n        let AddFilter = (property, value, defaul_value, default_filter) => {\r\n            if (value != defaul_value) {\r\n                filter[property] = value;\r\n            }\r\n            else if (default_filter) {\r\n                filter[property] = default_filter;\r\n            }\r\n        };\r\n        // property to filter | value to filter | if value to filter == default value => use default filter if exists\r\n        AddFilter(\"@showinmarketplace\", \"*\", \"*\", { $in: [\"true\", undefined] });\r\n        AddFilter(\"@shopcategory\", q.category?.toString(), \"*\", null);\r\n        AddFilter(\"@shopsubcategory1\", q.sub_category?.toString(), \"*\", null);\r\n        AddFilter(\"@enchantmentlevel\", q.enchant?.toString(), \"*\", null);\r\n        AddFilter(\"@tier\", q.tier?.toString(), \"*\", null);\r\n        let reg_exp = new RegExp(q.search.toString(), \"ig\");\r\n        // AddFilter(\"UniqueName\", { $regex: reg_exp }, \"\", null);\r\n        // AddFilter(\"@uniquename\", { $regex: reg_exp }, \"\", null);\r\n        // AddFilter(`LocalizedNames.${q.lang!.toString()}` as \"LocalizedNames\", { $regex: reg_exp }, \"\", null);\r\n        // if (q.category == \"mountskin\") {\r\n        //     AddFilter(\"@shopcategory\", \"*\", \"*\", { $exists: 0 });\r\n        // }\r\n        if (q.tier?.toString() == \"0\") {\r\n            AddFilter(\"@tier\", \"*\", \"*\", { $in: [\"0\", undefined] });\r\n        }\r\n        if (q.quality?.toString() != \"1\") {\r\n            AddFilter(\"@maxqualitylevel\", \"*\", \"*\", { $exists: 1 });\r\n        }\r\n        items = (await _config_mongodb__WEBPACK_IMPORTED_MODULE_0__[\"default\"].collections.itemsArray.aggregate([\r\n            { $match: filter },\r\n            {\r\n                $match: {\r\n                    $or: [{ UniqueName: reg_exp }, { \"@uniquename\": reg_exp }, { [`LocalizedNames.${q.lang.toString()}`]: reg_exp }],\r\n                },\r\n            },\r\n        ])\r\n            .sort({ [q.sort.toString()]: 1 })\r\n            .skip(parseInt(q.page.toString()) * parseInt(q.count.toString()))\r\n            .limit(parseInt(q.count.toString()))\r\n            .toArray());\r\n        // Read from items-tree collection\r\n    }\r\n    else {\r\n        // items = (\r\n        //     await DB.collections.itemsTree\r\n        //         .aggregate([\r\n        //             {\r\n        //                 $project: {\r\n        //                     [`${q.category?.toString()}.${q.sub_category?.toString()}`]: { $slice: [`$${q.category?.toString()}.${sub_category}`, page * count, page * count + count] },\r\n        //                 },\r\n        //             },\r\n        //         ])\r\n        //         .toArray()\r\n        // )[0][q.category as string][q.sub_category as string] as Document[];\r\n    }\r\n    if (items.length === 0) {\r\n        return res.status(404).json({ status: \"ERROR\", reason: \"No Items Found\" });\r\n    }\r\n    else {\r\n        return res.status(200).json({ status: \"OK\", data: items });\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/controllers/api-items.ts?");

/***/ }),

/***/ "./src/api/controllers/api-validators.ts":
/*!***********************************************!*\
  !*** ./src/api/controllers/api-validators.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validators\": () => (/* binding */ validators)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/api/controllers/constants.ts\");\n\r\n//--------------/api\r\nconst validators = (req, res, next) => {\r\n    let res_status = 400;\r\n    try {\r\n        if (req.method.toUpperCase() != \"GET\" && (res_status = 405))\r\n            throw new Error(\"Method Not Allowed\");\r\n        req.query.lang = req.query.lang ? req.query.lang : \"EN-US\";\r\n        if (req.query.lang != \"EN-US\" && !_constants__WEBPACK_IMPORTED_MODULE_0__.avalaible_langs.includes(req.query.lang) && (res_status = 400))\r\n            throw new Error(`Language Not Supported, supported languages: ${_constants__WEBPACK_IMPORTED_MODULE_0__.avalaible_langs}`);\r\n    }\r\n    catch (err) {\r\n        return res.status(res_status).send({ status: \"ERROR\", reason: err.message });\r\n    }\r\n    next();\r\n};\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/controllers/api-validators.ts?");

/***/ }),

/***/ "./src/api/controllers/app-index.ts":
/*!******************************************!*\
  !*** ./src/api/controllers/app-index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/paths */ \"./src/api/config/paths.ts\");\n/* harmony import */ var _middlewares_Return405__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middlewares/Return405 */ \"./src/api/middlewares/Return405.ts\");\n\r\n\r\n//--------------/\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    get: (req, res) => {\r\n        return res.status(200).sendFile(_config_paths__WEBPACK_IMPORTED_MODULE_0__.StaticDir + \"html\\\\index.html\");\r\n    },\r\n    all: _middlewares_Return405__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n});\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/controllers/app-index.ts?");

/***/ }),

/***/ "./src/api/controllers/constants.ts":
/*!******************************************!*\
  !*** ./src/api/controllers/constants.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"available_category\": () => (/* binding */ available_category),\n/* harmony export */   \"available_sub_category\": () => (/* binding */ available_sub_category),\n/* harmony export */   \"avalaible_langs\": () => (/* binding */ avalaible_langs),\n/* harmony export */   \"avalaible_sorts\": () => (/* binding */ avalaible_sorts)\n/* harmony export */ });\nconst available_category = [\r\n    \"all\",\r\n    \"melee\",\r\n    \"magic\",\r\n    \"ranged\",\r\n    \"offhand\",\r\n    \"armor\",\r\n    \"accessories\",\r\n    \"mounts\",\r\n    \"gatherergear\",\r\n    \"tools\",\r\n    \"consumables\",\r\n    \"skillbooks\",\r\n    \"resources\",\r\n    \"cityresources\",\r\n    \"artefacts\",\r\n    \"materials\",\r\n    \"token\",\r\n    \"farmables\",\r\n    \"products\",\r\n    \"luxurygoods\",\r\n    \"trophies\",\r\n    \"furniture\",\r\n    \"labourers\",\r\n    \"other\",\r\n];\r\nconst available_sub_category = {\r\n    all: [\"all\"],\r\n    melee: [\"axe\", \"dagger\", \"hammer\", \"mace\", \"quarterstaff\", \"spear\", \"sword\", \"knuckles\"],\r\n    magic: [\"arcanestaff\", \"cursestaff\", \"firestaff\", \"froststaff\", \"holystaff\", \"naturestaff\"],\r\n    ranged: [\"bow\", \"crossbow\"],\r\n    offhand: [\"book\", \"orb\", \"totem\", \"horn\", \"torch\", \"shield\"],\r\n    armor: [\"cloth_helmet\", \"leather_helmet\", \"plate_helmet\", \"unique_helmet\", \"cloth_armor\", \"leather_armor\", \"plate_armor\", \"unique_armor\", \"cloth_shoes\", \"leather_shoes\", \"plate_shoes\", \"unique_shoes\"],\r\n    accessories: [\"cape\", \"bag\"],\r\n    mounts: [\"ridinghorse\", \"armoredhorse\", \"ox\", \"mule\", \"cougar\", \"direwolf\", \"direbear\", \"direboar\", \"swampdragon\", \"giantstag\", \"rare_mount\", \"battle_mount\"],\r\n    gatherergear: [\r\n        \"fibergatherer_helmet\",\r\n        \"fishgatherer_helmet\",\r\n        \"hidegatherer_helmet\",\r\n        \"oregatherer_helmet\",\r\n        \"rockgatherer_helmet\",\r\n        \"woodgatherer_helmet\",\r\n        \"fibergatherer_armor\",\r\n        \"fishgatherer_armor\",\r\n        \"hidegatherer_armor\",\r\n        \"oregatherer_armor\",\r\n        \"rockgatherer_armor\",\r\n        \"woodgatherer_armor\",\r\n        \"fibergatherer_shoes\",\r\n        \"fishgatherer_shoes\",\r\n        \"hidegatherer_shoes\",\r\n        \"oregatherer_shoes\",\r\n        \"rockgatherer_shoes\",\r\n        \"woodgatherer_shoes\",\r\n        \"fibergatherer_backpack\",\r\n        \"fishgatherer_backpack\",\r\n        \"hidegatherer_backpack\",\r\n        \"oregatherer_backpack\",\r\n        \"rockgatherer_backpack\",\r\n        \"woodgatherer_backpack\",\r\n    ],\r\n    tools: [\"demolitionhammer\", \"fishing\", \"pickaxe\", \"sickle\", \"skinningknife\", \"stonehammer\", \"woodaxe\"],\r\n    consumables: [\"cooked\", \"potion\", \"fishingbait\", \"fish\", \"vanity\", \"maps\", \"kill_emotes\", \"other\"],\r\n    skillbooks: [\"skillbook\", \"skillbook_fiber\", \"skillbook_hide\", \"skillbook_ore\", \"skillbook_rock\", \"skillbook_wood\"],\r\n    resources: [\"fiber\", \"hide\", \"ore\", \"rock\", \"wood\", \"cloth\", \"leather\", \"metalbar\", \"stoneblock\", \"planks\", \"other\"],\r\n    cityresources: [\"beastheart\", \"mountainheart\", \"rockheart\", \"treeheart\", \"vineheart\", \"blackheart\"],\r\n    artefacts: [\"magic_artefact\", \"ranged_artefact\", \"melee_artefact\", \"armor_artefact\", \"offhand_artefact\", \"other\"],\r\n    materials: [\"essence\", \"rune\", \"relic\", \"soul\", \"other\"],\r\n    token: [\"arenasigils\", \"event\", \"royalsigils\", \"maps\", \"crystalleague\", \"other\"],\r\n    farmables: [\"animals\", \"seed\"],\r\n    products: [\"journal\", \"farming\", \"animals\", \"cooked\"],\r\n    luxurygoods: [\"bridgewatch\", \"caerleon\", \"fortsterling\", \"lymhurst\", \"martlock\", \"thetford\", \"any\"],\r\n    trophies: [\"fibertrophy\", \"fishtrophy\", \"generaltrophy\", \"hidetrophy\", \"mercenarytrophy\", \"oretrophy\", \"rocktrophy\", \"woodtrophy\"],\r\n    furniture: [\"banner\", \"bed\", \"decoration_furniture\", \"flag\", \"heretic_furniture\", \"keeper_furniture\", \"morgana_furniture\", \"repairkit\", \"table\", \"chest\", \"unique\"],\r\n    labourers: [\"woodcontract\", \"stonecontract\", \"fibercontract\", \"hidecontract\", \"orecontract\", \"mercenarycontract\", \"warriorcontract\", \"magecontract\", \"huntercontract\", \"toolmakercontract\", \"fishingcontract\"],\r\n    other: [\"mission\", \"other\", \"trash\"],\r\n};\r\nconst avalaible_sorts = [\"Index\", \"@uniquename\", \"UniqueName\", \"@tier\", \"LocalizedNames\"];\r\nconst avalaible_langs = [\"EN-US\", \"DE-DE\", \"FR-FR\", \"RU-RU\", \"PL-PL\", \"ES-ES\", \"PT-BR\", \"IT-IT\", \"ZH-CN\", \"KO-KR\", \"JA-JP\", \"ZH-TW\", \"ID-ID\"];\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/controllers/constants.ts?");

/***/ }),

/***/ "./src/api/middlewares/Return404.ts":
/*!******************************************!*\
  !*** ./src/api/middlewares/Return404.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/paths */ \"./src/api/config/paths.ts\");\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res, next) => {\r\n    res.status(404).sendFile(_config_paths__WEBPACK_IMPORTED_MODULE_0__.StaticDir + \"html\\\\404.html\");\r\n});\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/middlewares/Return404.ts?");

/***/ }),

/***/ "./src/api/middlewares/Return405.ts":
/*!******************************************!*\
  !*** ./src/api/middlewares/Return405.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/paths */ \"./src/api/config/paths.ts\");\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res) => {\r\n    res.status(405).sendFile(_config_paths__WEBPACK_IMPORTED_MODULE_0__.StaticDir + \"html\\\\405.html\");\r\n});\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/middlewares/Return405.ts?");

/***/ }),

/***/ "./src/api/middlewares/console-logging.ts":
/*!************************************************!*\
  !*** ./src/api/middlewares/console-logging.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chalk */ \"chalk\");\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_0__);\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((req, res, next) => {\r\n    let start = performance.now();\r\n    console.log(chalk__WEBPACK_IMPORTED_MODULE_0___default().bold.bgHex(\"#262626\")(chalk__WEBPACK_IMPORTED_MODULE_0___default().blueBright(\"REQUEST  \"), chalk__WEBPACK_IMPORTED_MODULE_0___default().hex(\"#00ff00\")(req.method.toUpperCase().padEnd(5, \" \")), chalk__WEBPACK_IMPORTED_MODULE_0___default().cyan(req.originalUrl.padEnd(48, \" \"))));\r\n    res.on(\"finish\", () => {\r\n        console.log(chalk__WEBPACK_IMPORTED_MODULE_0___default().bold.bgHex(\"#363636\")(chalk__WEBPACK_IMPORTED_MODULE_0___default().hex(\"#FFA500\")(\"RESPONSE \"), chalk__WEBPACK_IMPORTED_MODULE_0___default().hex(\"#00ff00\")(req.method.toUpperCase().padEnd(5, \" \")), chalk__WEBPACK_IMPORTED_MODULE_0___default().cyan(req.originalUrl.padEnd(36, \" \")), chalk__WEBPACK_IMPORTED_MODULE_0___default().hex(res.statusCode >= 400 ? \"#ff0000\" : res.statusCode >= 300 ? \"#FFA500\" : \"#00ff00\")(res.statusCode), chalk__WEBPACK_IMPORTED_MODULE_0___default().hex(\"#000000\")(Math.round(performance.now() - start)\r\n            .toString()\r\n            .padStart(5, \" \") + \"ms\")));\r\n    });\r\n    next();\r\n});\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/middlewares/console-logging.ts?");

/***/ }),

/***/ "./src/api/middlewares/favicon.ts":
/*!****************************************!*\
  !*** ./src/api/middlewares/favicon.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/paths */ \"./src/api/config/paths.ts\");\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function favicon(req, res, next) {\r\n    if (req.originalUrl.match(/\\/favicon\\.ico$/)) {\r\n        if (req.method.toUpperCase() === \"GET\") {\r\n            res.status(200).sendFile(_config_paths__WEBPACK_IMPORTED_MODULE_0__.StaticDir + \"img\\\\favicon.ico\");\r\n        }\r\n        else {\r\n            res.status(406).json({ message: \"Method Not Allowed\" });\r\n        }\r\n    }\r\n    else {\r\n        next();\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/middlewares/favicon.ts?");

/***/ }),

/***/ "./src/api/middlewares/middlewares.ts":
/*!********************************************!*\
  !*** ./src/api/middlewares/middlewares.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _console_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./console-logging */ \"./src/api/middlewares/console-logging.ts\");\n/* harmony import */ var _Return404__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Return404 */ \"./src/api/middlewares/Return404.ts\");\n/* harmony import */ var _favicon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./favicon */ \"./src/api/middlewares/favicon.ts\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    // !!! using \"*\" over \"\" will destroy the value of req.url\r\n    start: [\r\n        [\"\", _console_logging__WEBPACK_IMPORTED_MODULE_0__[\"default\"]],\r\n        [\"\", _favicon__WEBPACK_IMPORTED_MODULE_2__[\"default\"]],\r\n        [\"\", express__WEBPACK_IMPORTED_MODULE_3___default().json()],\r\n        [\"\", express__WEBPACK_IMPORTED_MODULE_3___default().urlencoded({ extended: true })], // if the request type is \r\n    ],\r\n    end: [\r\n        [\"/\", express__WEBPACK_IMPORTED_MODULE_3___default()[\"static\"](\"dist/assets\")],\r\n        [\"\", _Return404__WEBPACK_IMPORTED_MODULE_1__[\"default\"]], // just send a 404 error if the request reach this point\r\n    ],\r\n});\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/middlewares/middlewares.ts?");

/***/ }),

/***/ "./src/api/routes/api-router.ts":
/*!**************************************!*\
  !*** ./src/api/routes/api-router.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_api_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/api-index */ \"./src/api/controllers/api-index.ts\");\n/* harmony import */ var _controllers_api_items__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/api-items */ \"./src/api/controllers/api-items.ts\");\n/* harmony import */ var _controllers_api_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/api-validators */ \"./src/api/controllers/api-validators.ts\");\n\r\n\r\n\r\n\r\nconst apiRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\r\napiRouter.route(\"/*\").all(_controllers_api_validators__WEBPACK_IMPORTED_MODULE_3__.validators);\r\napiRouter.route(\"/\").get(_controllers_api_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get);\r\napiRouter.route(\"/item/:name\").get(_controllers_api_items__WEBPACK_IMPORTED_MODULE_2__.get_one);\r\napiRouter.route(\"/items\").get(_controllers_api_items__WEBPACK_IMPORTED_MODULE_2__.param_validator, _controllers_api_items__WEBPACK_IMPORTED_MODULE_2__.get_many);\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiRouter);\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/routes/api-router.ts?");

/***/ }),

/***/ "./src/api/routes/app-router.ts":
/*!**************************************!*\
  !*** ./src/api/routes/app-router.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controllers_app_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/app-index */ \"./src/api/controllers/app-index.ts\");\n\r\n\r\nconst appRouter = express__WEBPACK_IMPORTED_MODULE_0___default().Router();\r\nappRouter.route(\"/\").get(_controllers_app_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get).all(_controllers_app_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"].all);\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appRouter);\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/routes/app-router.ts?");

/***/ }),

/***/ "./src/api/server.ts":
/*!***************************!*\
  !*** ./src/api/server.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chalk */ \"chalk\");\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ \"./src/api/app.ts\");\n/* harmony import */ var _config_server_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/server-config */ \"./src/api/config/server-config.ts\");\n/* harmony import */ var _config_mongodb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/mongodb */ \"./src/api/config/mongodb.ts\");\n\r\n\r\n\r\n\r\n(async () => {\r\n    await _config_mongodb__WEBPACK_IMPORTED_MODULE_3__[\"default\"].connect();\r\n    if (_config_server_config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mode == \"production\") {\r\n        _app__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(3000, () => {\r\n            console.log(\"Server is running ...\");\r\n        });\r\n    }\r\n    else {\r\n        const server = _app__WEBPACK_IMPORTED_MODULE_1__[\"default\"].listen(3000, \"127.0.0.1\", () => {\r\n            let host = server.address();\r\n            console.log(chalk__WEBPACK_IMPORTED_MODULE_0___default().greenBright.bold.bgHex(\"#000\")(\"Server is running on \" + chalk__WEBPACK_IMPORTED_MODULE_0___default().cyanBright(\"http://\" + host.address + \":\" + host.port)));\r\n        });\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack://ao-price-checker/./src/api/server.ts?");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/api/server.ts");
/******/ 	
/******/ })()
;