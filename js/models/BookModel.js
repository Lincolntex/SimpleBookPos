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

    TestBook(num) {
        return {
            'Title' : 'title ' + num,
            'Author' : this.Author,
            'Artist' : this.Artist,
            'Sku10' : this.Sku10,
            'Sku13' : this.Sku13,
            'Quantity' : this.Quantity
        }
    }

    _TestModel() {
        let rnd = Math.random() * (1000 - 1) + 1;

        return {
            'Title' : 'Title_' + rnd,
            'Author' : 'Author_' + rnd,
            'Artist' : 'Artist_' + rnd,
            'Sku10' : rnd,
            'Sku13' : rnd + 100,
            'Quantity' : rnd + 5
        }
    }
}

module.exports.BookModel = BookModel;