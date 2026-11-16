package com.arttale.app.domain.usecase

import com.arttale.app.domain.model.Product
import com.arttale.app.domain.model.Tribe
import com.arttale.app.domain.repository.ProductRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetProductsUseCase @Inject constructor(
    private val repository: ProductRepository
) {
    operator fun invoke(): Flow<List<Product>> = repository.getProducts()
}

class GetProductByIdUseCase @Inject constructor(
    private val repository: ProductRepository
) {
    suspend operator fun invoke(id: Int): Product? = repository.getProductById(id)
}

class GetTribesUseCase @Inject constructor(
    private val repository: ProductRepository
) {
    operator fun invoke(): Flow<List<Tribe>> = repository.getTribes()
}
