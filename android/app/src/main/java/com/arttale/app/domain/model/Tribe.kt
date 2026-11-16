package com.arttale.app.domain.model

data class Tribe(
    val slug: String,
    val name: String,
    val emoji: String,
    val memberCount: String,
    val productCount: Int,
    val growthRate: String,
    val description: String,
    val bgColorHex: Long
)
