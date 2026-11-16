package com.arttale.app.core.di

import com.arttale.app.data.repository.CartRepositoryImpl
import com.arttale.app.data.repository.ProductRepositoryImpl
import com.arttale.app.domain.repository.CartRepository
import com.arttale.app.domain.repository.ProductRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {

    @Binds
    @Singleton
    abstract fun bindProductRepository(
        impl: ProductRepositoryImpl
    ): ProductRepository

    @Binds
    @Singleton
    abstract fun bindCartRepository(
        impl: CartRepositoryImpl
    ): CartRepository
}
