package com.arttale.app.domain.model

data class UserProfile(
    val id: String = "usr_001",
    val displayName: String = "Kreator Muda",
    val username: String = "@kreatormuda",
    val bio: String = "Seniman digital & pecinta desain lokal. Coretanku adalah ceritaku. ✏️",
    val avatarEmoji: String = "🎨",
    val avatarBgHex: Long = 0xFFEDE9FE,
    val joinDate: String = "Nov 2024",
    val tribe: String = "Indie Music",
    val tribeEmoji: String = "🎵",
    val totalSales: Int = 0,
    val totalRevenue: Long = 0L,
    val totalUploads: Int = 0,
    val totalOrders: Int = 0,
    val isPro: Boolean = false,
    val badges: List<CreatorBadge> = emptyList()
)

data class CreatorBadge(
    val id: String,
    val label: String,
    val emoji: String,
    val colorHex: Long
)
