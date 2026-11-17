package com.arttale.app.presentation.profile

import androidx.lifecycle.ViewModel
import com.arttale.app.domain.model.CreatorBadge
import com.arttale.app.domain.model.OrderHistory
import com.arttale.app.domain.model.OrderStatus
import com.arttale.app.domain.model.UserProfile
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import javax.inject.Inject

data class ProfileUiState(
    val profile: UserProfile = UserProfile(),
    val orders: List<OrderHistory> = emptyList(),
    val selectedTab: ProfileTab = ProfileTab.OVERVIEW,
    val showEditDialog: Boolean = false,
    val editName: String = "",
    val editBio: String = "",
    val editAvatarEmoji: String = ""
)

enum class ProfileTab(val label: String) {
    OVERVIEW("Ringkasan"),
    ORDERS("Pesanan"),
    MY_ARTS("Karyaku")
}

@HiltViewModel
class ProfileViewModel @Inject constructor() : ViewModel() {

    private val _uiState = MutableStateFlow(ProfileUiState())
    val uiState: StateFlow<ProfileUiState> = _uiState.asStateFlow()

    init {
        loadProfile()
        loadOrders()
    }

    private fun loadProfile() {
        // Mock profile data — siap diganti dengan data dari repository/API
        val profile = UserProfile(
            id = "usr_001",
            displayName = "Andi Kreator",
            username = "@andikreator",
            bio = "Seniman digital & pecinta desain lokal. Coretanku adalah ceritaku. ✏️",
            avatarEmoji = "🎨",
            avatarBgHex = 0xFFEDE9FE,
            joinDate = "Nov 2024",
            tribe = "Indie Music",
            tribeEmoji = "🎵",
            totalSales = 142,
            totalRevenue = 7_540_000L,
            totalUploads = 18,
            totalOrders = 5,
            isPro = false,
            badges = listOf(
                CreatorBadge("early_bird", "Early Bird", "🐦", 0xFFFEF3C7),
                CreatorBadge("first_sale", "First Sale", "🎉", 0xFFD1FAE5),
                CreatorBadge("tribe_member", "Tribe Member", "🔥", 0xFFFCE7F3)
            )
        )
        _uiState.update { it.copy(profile = profile) }
    }

    private fun loadOrders() {
        // Mock order history — siap diganti dengan data dari database lokal / API
        val orders = listOf(
            OrderHistory(
                id = "ORD-001",
                productTitle = "Kaos Anime Vibes",
                productEmoji = "🎴",
                productColorHex = 0xFF141414,
                quantity = 2,
                totalPrice = 269_000L,
                status = OrderStatus.DELIVERED,
                date = "12 Nov 2024",
                size = "L",
                color = "Hitam"
            ),
            OrderHistory(
                id = "ORD-002",
                productTitle = "Stiker Receh Pack",
                productEmoji = "😂",
                productColorHex = 0xFFFEF9C3,
                quantity = 1,
                totalPrice = 45_000L,
                status = OrderStatus.SHIPPED,
                date = "14 Nov 2024",
                size = "-",
                color = "-"
            ),
            OrderHistory(
                id = "ORD-003",
                productTitle = "Tote Bag Kopi",
                productEmoji = "☕",
                productColorHex = 0xFFF5F5F4,
                quantity = 1,
                totalPrice = 125_000L,
                status = OrderStatus.PROCESSING,
                date = "16 Nov 2024",
                size = "-",
                color = "Putih"
            ),
            OrderHistory(
                id = "ORD-004",
                productTitle = "Hoodie Gamer",
                productEmoji = "🎮",
                productColorHex = 0xFFEDE9FE,
                quantity = 1,
                totalPrice = 319_000L,
                status = OrderStatus.PENDING,
                date = "17 Nov 2024",
                size = "XL",
                color = "Violet"
            )
        )
        _uiState.update { it.copy(orders = orders) }
    }

    fun onTabSelected(tab: ProfileTab) {
        _uiState.update { it.copy(selectedTab = tab) }
    }

    fun onEditProfileClicked() {
        val profile = _uiState.value.profile
        _uiState.update {
            it.copy(
                showEditDialog = true,
                editName = profile.displayName,
                editBio = profile.bio,
                editAvatarEmoji = profile.avatarEmoji
            )
        }
    }

    fun onEditNameChanged(name: String) {
        _uiState.update { it.copy(editName = name) }
    }

    fun onEditBioChanged(bio: String) {
        _uiState.update { it.copy(editBio = bio) }
    }

    fun onEditAvatarSelected(emoji: String) {
        _uiState.update { it.copy(editAvatarEmoji = emoji) }
    }

    fun onSaveProfile() {
        val state = _uiState.value
        _uiState.update {
            it.copy(
                profile = it.profile.copy(
                    displayName = state.editName.trim().ifEmpty { it.profile.displayName },
                    bio = state.editBio.trim().ifEmpty { it.profile.bio },
                    avatarEmoji = state.editAvatarEmoji.ifEmpty { it.profile.avatarEmoji }
                ),
                showEditDialog = false
            )
        }
    }

    fun onDismissEditDialog() {
        _uiState.update { it.copy(showEditDialog = false) }
    }
}
