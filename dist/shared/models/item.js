export default class Item {
    LocalizationNameVariable;
    LocalizationDescriptionVariable;
    LocalizedNames;
    LocalizedDescriptions;
    Index;
    UniqueName;
    id;
    constructor(LocalizationNameVariable, LocalizationDescriptionVariable, LocalizedNames, LocalizedDescriptions, Index, UniqueName, id) {
        this.LocalizationNameVariable = LocalizationNameVariable;
        this.LocalizationDescriptionVariable = LocalizationDescriptionVariable;
        this.LocalizedNames = LocalizedNames;
        this.LocalizedDescriptions = LocalizedDescriptions;
        this.Index = Index;
        this.UniqueName = UniqueName;
        this.id = id;
    }
    get_img_url(quality = null) {
        return `https://render.albiononline.com/v1/item/${this.UniqueName}.png${quality !== null ? "?qulity=" + quality : void 0}`;
    }
}
