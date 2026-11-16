package com.arttale.app.domain.model

data class Product(
    val id: Int,
    val title: String,
    val artist: String,
    val price: Long,
    val originalPrice: Long = (price * 1.25).toLong(),
    val category: String, // Pakaian, Stiker, Aksesoris, Home & Art
    val style: String,    // Tipografi, Minimalis, Ilustrasi, Vintage, Parodi
    val emoji: String,    // Representasi artwork ikonik
    val hexColor: Long = 0xFF141414,
    val bestseller: Boolean = false,
    val description: String = "Dicetak dengan teknologi DTF kualitas tinggi, katun premium lembut dan nyaman dipakai sehari-hari.",
    val availableColors: List<ProductColor> = listOf(
        ProductColor("Hitam", 0xFF141414),
        ProductColor("Putih", 0xFFFAFAFA),
        ProductColor("Abu", 0xFF9CA3AF),
        ProductColor("Violet", 0xFF6C5CE7),
        ProductColor("Maroon", 0xFF7F1D1D)
    ),
    val availableSizes: List<String> = listOf("S", "M", "L", "XL", "XXL"),
    val availableQualities: List<ProductQuality> = listOf(
        ProductQuality("std", "Standard", 0, "Cotton 24s, ringan & adem"),
        ProductQuality("prm", "Premium", 30_000, "Cotton 30s combed, halus"),
        ProductQuality("hvy", "Heavyweight", 70_000, "Cotton 20s tebal, streetwear feel")
    )
) {
    // Helper to fix title typing if needed
    val displayTitle: String get() = title.ifEmpty { "Karya Seni" }
}

data class ProductColor(val name: String, val hex: Long)
data class ProductQuality(val id: String, val label: String, val additionalPrice: Long, val desc: String)
