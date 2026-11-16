package com.arttale.app.data.local

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.arttale.app.domain.model.CartItem

@Entity(tableName = "cart_items")
data class CartItemEntity(
    @PrimaryKey
    val id: String,
    val productId: Int,
    val title: String,
    val artist: String,
    val emoji: String,
    val color: String,
    val size: String,
    val quality: String,
    val basePrice: Long,
    val tip: Long,
    val quantity: Int
) {
    fun toDomain(): CartItem = CartItem(
        id = id,
        productId = productId,
        title = title,
        artist = artist,
        emoji = emoji,
        color = color,
        size = size,
        quality = quality,
        basePrice = basePrice,
        tip = tip,
        quantity = quantity
    )

    companion object {
        fun fromDomain(item: CartItem): CartItemEntity = CartItemEntity(
            id = item.id,
            productId = item.productId,
            title = item.title,
            artist = item.artist,
            emoji = item.emoji,
            color = item.color,
            size = item.size,
            quality = item.quality,
            basePrice = item.basePrice,
            tip = item.tip,
            quantity = item.quantity
        )
    }
}
