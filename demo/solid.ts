class Item {
    constructor(
        readonly id: number,
        readonly itemSpec: ItemSpec,
        readonly imgUrl: string,
        public price: number,
        public quantity: number
    ) {}

    setPrice(newPrice: number): boolean {
        if(newPrice <= 0) return false;

        this.price = newPrice;
        return true;
    }

    increaseQuantity(amount: number): boolean {
        if(amount <= 0) return false;
        this.price += amount;
        return true;
    }

    decreaseQuantity(amount: number): boolean {
        if(amount <= 0) return false;
        this.price -= amount;
        return true;
    }

    compare(spec: ItemSpec): boolean {
        return this.itemSpec.compare(spec);
    }

    // encodeToString(): string {
    //     return `${this.id} - ${this.itemSpec.name} - ${this.itemSpec.type} - ${this.itemSpec.color}`;
    // }

    // encodeToJson(): string{
    //     return `
    //         {
    //             "id": ${this.id},
    //             "name": ${this.itemSpec.name},
    //             "type": ${this.itemSpec.type},
    //             "color": ${this.itemSpec.color}
    //         }
    //     `;
    // }

    encode(encoder: I_ItemEncoder): string {
        return encoder.encode(this);
    }

    saveToDb(dbConn: any): boolean {
        console.log("Saving to db....");
        return true;
    }

    removeFromDb(dbConn: any): boolean {
        console.log("Remove from db....");
        return true;
    }
}

interface I_ItemEncoder {
    encode(item: Item): string;
}

class ItemStringEncoder implements I_ItemEncoder {
    encode(item: Item): string {
        return `${item.id} - ${item.itemSpec.name} - ${item.itemSpec.type} - ${item.itemSpec.color}`;
    }
}

class ItemJsonEncoder implements I_ItemEncoder {
    encode(item: Item): string {
        return `
            {
                "id": ${item.id},
                "name": ${item.itemSpec.name},
                "type": ${item.itemSpec.type},
                "color": ${item.itemSpec.color}
            }
        `;
    }
}

class ItemXmlEncoder implements I_ItemEncoder {
    encode(item: Item): string {
        return `<XML>${item.itemSpec.name}</XML>`
    }
}

class ItemWrongEncoder implements I_ItemEncoder {
    encode(item: Item): string {
        throw new Error("error");
        return "";
    }
}

class ItemSpec {
    constructor(
        readonly name: string,
        readonly type: string,
        readonly color: string
    ) {}

    compare(spec: ItemSpec): boolean {
        return this.name === spec.name &&
            this.type === spec.type &&
            this.color === spec.color;
    }
}

class DigitalItemSpec extends ItemSpec {
    constructor(
        readonly fileExt: string,
        readonly name: string,
        readonly type: string,
        readonly color: string) {
            super(name, type, color);
        }

    compare(spec: DigitalItemSpec): boolean {
        return spec.fileExt === this.fileExt && super.compare(spec);
    }
}
// === compare without conversion
// == compare with some conversion
abstract class Shape {
    public abstract area(): number;
}

class Square extends Shape {
    public area(): number {
        return 1;
    }
}

interface Encoder {
    encode(): void;
}

interface Decoder {
    decode(): void;
}

class Encoder implements Encoder {
    encode(): void {}
}

class EnDecoder implements Encoder, Decoder {
    encode(): void {}
    decode(): void {}
}

interface DataInput {
    create(): void;
    update(): void;
    delete(): void;
}

interface DataOutput {
    read(): void;
    list(): void;
}