package com.arttale.app.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface CartDao {
    @Query("SELECT * FROM cart_items ORDER BY rowid DESC")
    fun getAllCartItems(): Flow<List<CartItemEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItem(item: CartItemEntity)

    @Query("UPDATE cart_items SET quantity = :newQty WHERE id = :id")
    suspend fun updateQuantity(id: String, newQty: Int)

    @Query("DELETE FROM cart_items WHERE id = :id")
    suspend fun deleteItem(id: String)

    @Query("DELETE FROM cart_items")
    suspend fun clearCart()
}
