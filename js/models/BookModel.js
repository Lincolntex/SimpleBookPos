class BookModel {
    constructor() {
        this.Title =''
        this.Author = ''
        this.Artist = ''
        this.Sku10 = ''
        this.Sku13 = ''
        this.Quantity = ''
    }

    CreateBook(title, author, artist, sku10, sku13, quant) {
        this.Title = title;
        this.Author = author;
        this.Artist = artist;
        this.Sku10 = sku10;
        this.Sku13 = sku13;
        this.Quantity = quant;
        return this;
    }

    ToModel() {
        return {
            'Title' : this.Title,
            'Author' : this.Author,
            'Artist' : this.Artist,
            'Sku10' : this.Sku10,
            'Sku13' : this.Sku13,
            'Quantity' : this.Quantity
        }
    }

    _TestModel() {
        let rnd = Math.random() * (10 - 1) + 1;

        this.Title = 'Title_' + rnd,
        this.Author = 'Author_' + rnd,
        this.Artist = 'Artist_' + rnd,
        this.Sku10 = rnd,
        this.Sku13 = rnd + 100,
        this.Author = rnd + 5
        return this; 
    }
}

module.exports.BookModel = BookModel;