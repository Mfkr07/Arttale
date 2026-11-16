package com.arttale.app.data.repository

import com.arttale.app.data.local.CartDao
import com.arttale.app.data.local.CartItemEntity
import com.arttale.app.domain.model.CartItem
import com.arttale.app.domain.repository.CartRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class CartRepositoryImpl @Inject constructor(
    private val cartDao: CartDao
) : CartRepository {

    override fun getCartItems(): Flow<List<CartItem>> {
        return cartDao.getAllCartItems().map { list ->
            list.map { it.toDomain() }
        }
    }

    override suspend fun addToCart(item: CartItem) {
        cartDao.insertItem(CartItemEntity.fromDomain(item))
    }

    override suspend fun updateQuantity(id: String, newQty: Int) {
        if (newQty <= 0) {
            cartDao.deleteItem(id)
        } else {
            cartDao.updateQuantity(id, newQty)
        }
    }

    override suspend fun removeItem(id: String) {
        cartDao.deleteItem(id)
    }

    override suspend fun clearCart() {
        cartDao.clearCart()
    }
}
