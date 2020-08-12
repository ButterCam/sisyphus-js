import * as $sisyphus from "@sisyphus.js/core"
import * as $protobuf from "protobufjs"
import * as $reflection from "../../../../_reflection"
import * as $product from "./product"
import * as $any from "../../../../google/protobuf/any"


/** Payment 的内容 */
export interface IPaymentPayload {
    /** 选择的商品 */
    product?: string
    /** 计算出来的 Plan Hash，用于确定选取的 Plan */
    planHash?: Uint8Array
}

export class PaymentPayload extends $sisyphus.Message<IPaymentPayload> implements IPaymentPayload {
    product!: string
    planHash!: Uint8Array
    get $reflection() {
        return PaymentPayload.reflection
    }

    static readonly reflection = $reflection.root.lookupType(".bybutter.incubator.shop.v1.PaymentPayload")
    static decode(reader: Uint8Array | $protobuf.Reader, length?: number): PaymentPayload {
        if(!(reader instanceof $protobuf.Reader)) reader = $protobuf.Reader.create(reader)
        const end = length === undefined ? reader.len : reader.pos + length
        const result = new this()
        while(reader.pos < end) {
            let tag = reader.uint32()
            switch(tag>>>3) {
                case 1:
                    result.product = reader.string()
                    break
                case 2:
                    result.planHash = reader.bytes()
                    break
            }
        }
        return result
    }

    static decodeDelimited(reader: Uint8Array | $protobuf.Reader): PaymentPayload {
        if(!(reader instanceof $protobuf.Reader)) reader = $protobuf.Reader.create(reader)
        return this.decode(reader, reader.uint32())
    }
    static create(properties?: IPaymentPayload): PaymentPayload {
        if(properties instanceof this) return properties
        const result = new this()
        if (!properties) return result
        if(properties.hasOwnProperty("product") && properties.product !== undefined) result.product = properties.product
        if(properties.hasOwnProperty("planHash") && properties.planHash !== undefined) result.planHash = properties.planHash
        return result
    }
}
PaymentPayload.prototype.product = ""
PaymentPayload.prototype.planHash = $sisyphus.emptyBytes


/** 解析完成的订单商品 */
export interface IResolvedOrderItem {
    /** 订单内容的 Payment 信息 */
    payment?: (IPaymentPayload | null)
    /** 商品接哦古 */
    product?: ($product.IProduct | null)
    /** 所选择的规格 */
    plan?: ($product.IPlan | null)
    /**
     * 创建订单所提供的物品 Meta 信息
     * (-- api-linter: core::0146::any=disabled
     * aip.dev/not-precedent: 通用组件 --)
     */
    metadata?: ($any.IAny[] | null)
}

export class ResolvedOrderItem extends $sisyphus.Message<IResolvedOrderItem> implements IResolvedOrderItem {
    payment!: (IPaymentPayload | null)
    product!: ($product.IProduct | null)
    plan!: ($product.IPlan | null)
    metadata!: ($any.IAny[] | null)
    get $reflection() {
        return ResolvedOrderItem.reflection
    }

    static readonly reflection = $reflection.root.lookupType(".bybutter.incubator.shop.v1.ResolvedOrderItem")
    static decode(reader: Uint8Array | $protobuf.Reader, length?: number): ResolvedOrderItem {
        if(!(reader instanceof $protobuf.Reader)) reader = $protobuf.Reader.create(reader)
        const end = length === undefined ? reader.len : reader.pos + length
        const result = new this()
        while(reader.pos < end) {
            let tag = reader.uint32()
            switch(tag>>>3) {
                case 1:
                    result.payment = PaymentPayload.decodeDelimited(reader)
                    break
                case 2:
                    result.product = $product.Product.decodeDelimited(reader)
                    break
                case 3:
                    result.plan = $product.Plan.decodeDelimited(reader)
                    break
                case 4:
                    if (!result.metadata) result.metadata = []
                    result.metadata.push($any.Any.decodeDelimited(reader))
                    break
            }
        }
        return result
    }

    static decodeDelimited(reader: Uint8Array | $protobuf.Reader): ResolvedOrderItem {
        if(!(reader instanceof $protobuf.Reader)) reader = $protobuf.Reader.create(reader)
        return this.decode(reader, reader.uint32())
    }
    static create(properties?: IResolvedOrderItem): ResolvedOrderItem {
        if(properties instanceof this) return properties
        const result = new this()
        if (!properties) return result
        if(properties.hasOwnProperty("payment") && properties.payment !== undefined) result.payment = PaymentPayload.create(properties.payment)
        if(properties.hasOwnProperty("product") && properties.product !== undefined) result.product = $product.Product.create(properties.product)
        if(properties.hasOwnProperty("plan") && properties.plan !== undefined) result.plan = $product.Plan.create(properties.plan)
        if(properties.hasOwnProperty("metadata") && properties.metadata !== undefined) result.metadata = $any.Any.create(properties.metadata)
        return result
    }
}
ResolvedOrderItem.prototype.payment = null
ResolvedOrderItem.prototype.product = null
ResolvedOrderItem.prototype.plan = null
ResolvedOrderItem.prototype.metadata = null