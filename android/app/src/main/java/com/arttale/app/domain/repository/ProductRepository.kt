package com.arttale.app.domain.repository

import com.arttale.app.domain.model.Product
import com.arttale.app.domain.model.Tribe
import kotlinx.coroutines.flow.Flow

interface ProductRepository {
    fun getProducts(): Flow<List<Product>>
    suspend fun getProductById(id: Int): Product?
    fun getTribes(): Flow<List<Tribe>>
}
