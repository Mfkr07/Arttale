package com.arttale.app.presentation.profile

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.HeartBroken
import androidx.compose.material.icons.filled.Help
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.Logout
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.arttale.app.core.common.toRupiah
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.CreativeVioletSoft
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkBorder
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.MintGreen
import com.arttale.app.core.theme.PaperBackground
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.core.theme.SoftPink
import com.arttale.app.core.theme.SoftPinkBg
import com.arttale.app.core.theme.WarmYellow
import com.arttale.app.core.theme.WarmYellowSoft
import com.arttale.app.core.theme.sketchBorder
import com.arttale.app.core.theme.sketchBorderLight
import com.arttale.app.domain.model.CreatorBadge
import com.arttale.app.domain.model.OrderHistory
import com.arttale.app.domain.model.OrderStatus
import com.arttale.app.domain.model.UserProfile
import com.arttale.app.presentation.cart.CartViewModel
import com.arttale.app.presentation.components.BottomNavBar
import com.arttale.app.presentation.components.SketchButton
import com.arttale.app.presentation.components.SketchCard
import com.arttale.app.presentation.navigation.Screen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    onNavigateBottom: (Screen) -> Unit,
    viewModel: ProfileViewModel = hiltViewModel(),
    cartViewModel: CartViewModel = hiltViewModel()
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    val cartState by cartViewModel.uiState.collectAsStateWithLifecycle()

    if (state.showEditDialog) {
        EditProfileDialog(
            name = state.editName,
            bio = state.editBio,
            avatarEmoji = state.editAvatarEmoji,
            onNameChanged = viewModel::onEditNameChanged,
            onBioChanged = viewModel::onEditBioChanged,
            onAvatarSelected = viewModel::onEditAvatarSelected,
            onSave = viewModel::onSaveProfile,
            onDismiss = viewModel::onDismissEditDialog
        )
    }

    Scaffold(
        containerColor = PaperBackground,
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        "Profil Saya",
                        fontWeight = FontWeight.Bold,
                        fontSize = 20.sp,
                        color = InkBlack
                    )
                },
                actions = {
                    IconButton(onClick = viewModel::onEditProfileClicked) {
                        Icon(
                            imageVector = Icons.Default.Edit,
                            contentDescription = "Edit Profil",
                            tint = InkBlack
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = PaperBackground)
            )
        },
        bottomBar = {
            BottomNavBar(
                currentRoute = Screen.Profile.route,
                cartCount = cartState.totalQuantity,
                onNavigate = onNavigateBottom
            )
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
            contentPadding = PaddingValues(bottom = 24.dp)
        ) {

            // --- SECTION 1: Avatar & Identity Card ---
            item {
                ProfileIdentityCard(
                    profile = state.profile,
                    onEditClick = viewModel::onEditProfileClicked
                )
                Spacer(modifier = Modifier.height(16.dp))
            }

            // --- SECTION 2: Stats Row ---
            item {
                ProfileStatsRow(profile = state.profile)
                Spacer(modifier = Modifier.height(16.dp))
            }

            // --- SECTION 3: Badges ---
            if (state.profile.badges.isNotEmpty()) {
                item {
                    BadgesSection(badges = state.profile.badges)
                    Spacer(modifier = Modifier.height(16.dp))
                }
            }

            // --- SECTION 4: Tab Selector ---
            item {
                ProfileTabRow(
                    selectedTab = state.selectedTab,
                    onTabSelected = viewModel::onTabSelected
                )
                Spacer(modifier = Modifier.height(12.dp))
            }

            // --- SECTION 5: Tab Content ---
            when (state.selectedTab) {
                ProfileTab.OVERVIEW -> {
                    item {
                        OverviewSection()
                    }
                }

                ProfileTab.ORDERS -> {
                    if (state.orders.isEmpty()) {
                        item { EmptyOrdersPlaceholder() }
                    } else {
                        items(state.orders, key = { it.id }) { order ->
                            OrderHistoryCard(order = order)
                            Spacer(modifier = Modifier.height(10.dp))
                        }
                    }
                }

                ProfileTab.MY_ARTS -> {
                    item { MyArtsPlaceholder(uploadCount = state.profile.totalUploads) }
                }
            }
        }
    }
}

// ─────────────────────────────────────────────
//  Profile Identity Card
// ─────────────────────────────────────────────
@Composable
private fun ProfileIdentityCard(
    profile: UserProfile,
    onEditClick: () -> Unit
) {
    SketchCard(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp),
        cornerRadius = 16.dp,
        shadowOffset = 5.dp
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Avatar
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .sketchBorder(strokeWidth = 2.dp, shadowOffset = 3.dp, cornerRadius = 40.dp)
                    .clip(CircleShape)
                    .background(Color(profile.avatarBgHex)),
                contentAlignment = Alignment.Center
            ) {
                Text(text = profile.avatarEmoji, fontSize = 36.sp)
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Name
            Text(
                text = profile.displayName,
                fontWeight = FontWeight.ExtraBold,
                fontSize = 22.sp,
                color = InkBlack,
                textAlign = TextAlign.Center
            )

            Text(
                text = profile.username,
                fontSize = 13.sp,
                color = InkMuted,
                textAlign = TextAlign.Center
            )

            Spacer(modifier = Modifier.height(8.dp))

            // Bio
            Text(
                text = profile.bio,
                fontSize = 13.sp,
                color = InkBlack.copy(alpha = 0.75f),
                textAlign = TextAlign.Center,
                lineHeight = 19.sp,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )

            Spacer(modifier = Modifier.height(12.dp))

            // Tribe Tag + Join Date
            Row(
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 20.dp)
                        .clip(RoundedCornerShape(20.dp))
                        .background(CreativeVioletSoft)
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = "${profile.tribeEmoji} ${profile.tribe}",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = CreativeViolet
                    )
                }

                Spacer(modifier = Modifier.width(8.dp))

                Text(
                    text = "Bergabung ${profile.joinDate}",
                    fontSize = 11.sp,
                    color = InkMuted
                )
            }

            // PRO Badge (optional)
            if (profile.isPro) {
                Spacer(modifier = Modifier.height(8.dp))
                Box(
                    modifier = Modifier
                        .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 6.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(WarmYellow)
                        .padding(horizontal = 10.dp, vertical = 3.dp)
                ) {
                    Text(
                        text = "⭐ PRO KREATOR",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = InkBlack
                    )
                }
            }
        }
    }
}

// ─────────────────────────────────────────────
//  Stats Row
// ─────────────────────────────────────────────
@Composable
private fun ProfileStatsRow(profile: UserProfile) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        StatCard(
            modifier = Modifier.weight(1f),
            emoji = "🛍️",
            value = "${profile.totalSales}",
            label = "Terjual",
            bgColor = WarmYellowSoft
        )
        StatCard(
            modifier = Modifier.weight(1f),
            emoji = "🎨",
            value = "${profile.totalUploads}",
            label = "Karya",
            bgColor = CreativeVioletSoft
        )
        StatCard(
            modifier = Modifier.weight(1f),
            emoji = "📦",
            value = "${profile.totalOrders}",
            label = "Pesanan",
            bgColor = Color(0xFFD1FAE5)
        )
    }
}

@Composable
private fun StatCard(
    modifier: Modifier = Modifier,
    emoji: String,
    value: String,
    label: String,
    bgColor: Color
) {
    SketchCard(
        modifier = modifier,
        backgroundColor = bgColor,
        cornerRadius = 12.dp,
        shadowOffset = 3.dp
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = emoji, fontSize = 20.sp)
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = value,
                fontWeight = FontWeight.ExtraBold,
                fontSize = 18.sp,
                color = InkBlack
            )
            Text(
                text = label,
                fontSize = 11.sp,
                color = InkMuted
            )
        }
    }
}

// ─────────────────────────────────────────────
//  Badges Section
// ─────────────────────────────────────────────
@Composable
private fun BadgesSection(badges: List<CreatorBadge>) {
    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
        Text(
            text = "Badge Kamu",
            fontWeight = FontWeight.Bold,
            fontSize = 15.sp,
            color = InkBlack
        )
        Spacer(modifier = Modifier.height(8.dp))
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            badges.forEach { badge ->
                Box(
                    modifier = Modifier
                        .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 10.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(Color(badge.colorHex))
                        .padding(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(text = badge.emoji, fontSize = 14.sp)
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(
                            text = badge.label,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = InkBlack
                        )
                    }
                }
            }
        }
    }
}

// ─────────────────────────────────────────────
//  Tab Row
// ─────────────────────────────────────────────
@Composable
private fun ProfileTabRow(
    selectedTab: ProfileTab,
    onTabSelected: (ProfileTab) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        ProfileTab.entries.forEach { tab ->
            val isSelected = selectedTab == tab
            Box(
                modifier = Modifier
                    .weight(1f)
                    .sketchBorder(
                        strokeWidth = 1.5.dp,
                        borderColor = if (isSelected) CreativeViolet else InkBorder,
                        shadowOffset = if (isSelected) 2.dp else 0.dp,
                        cornerRadius = 10.dp
                    )
                    .clip(RoundedCornerShape(10.dp))
                    .background(if (isSelected) CreativeViolet else PaperCard)
                    .clickable { onTabSelected(tab) }
                    .padding(vertical = 10.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = tab.label,
                    fontSize = 12.sp,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                    color = if (isSelected) PaperCard else InkBlack,
                    textAlign = TextAlign.Center
                )
            }
        }
    }
}

// ─────────────────────────────────────────────
//  OVERVIEW: Menu Pengaturan
// ─────────────────────────────────────────────
@Composable
private fun OverviewSection() {
    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
        Text(
            text = "Akun & Pengaturan",
            fontWeight = FontWeight.Bold,
            fontSize = 15.sp,
            color = InkBlack,
            modifier = Modifier.padding(bottom = 10.dp)
        )

        SketchCard(
            modifier = Modifier.fillMaxWidth(),
            cornerRadius = 14.dp,
            shadowOffset = 4.dp
        ) {
            Column {
                ProfileMenuItem(
                    icon = Icons.Default.LocalShipping,
                    label = "Lacak Pesanan",
                    subtitle = "Lihat status pengirimanmu",
                    iconBgColor = Color(0xFFD1FAE5)
                )
                ProfileMenuDivider()
                ProfileMenuItem(
                    icon = Icons.Default.Palette,
                    label = "Karya Tersimpan",
                    subtitle = "Wishlist karyamu",
                    iconBgColor = CreativeVioletSoft
                )
                ProfileMenuDivider()
                ProfileMenuItem(
                    icon = Icons.Default.AutoAwesome,
                    label = "Upgrade ke PRO",
                    subtitle = "Buka fitur kreator premium",
                    iconBgColor = WarmYellowSoft,
                    trailingBadge = "BARU"
                )
                ProfileMenuDivider()
                ProfileMenuItem(
                    icon = Icons.Default.Notifications,
                    label = "Notifikasi",
                    subtitle = "Atur preferensi notifikasi",
                    iconBgColor = Color(0xFFFFECEC)
                )
                ProfileMenuDivider()
                ProfileMenuItem(
                    icon = Icons.Default.Shield,
                    label = "Keamanan",
                    subtitle = "Password & verifikasi",
                    iconBgColor = Color(0xFFE0F2FE)
                )
                ProfileMenuDivider()
                ProfileMenuItem(
                    icon = Icons.Default.Help,
                    label = "Bantuan & FAQ",
                    subtitle = "Pusat bantuan Arttale",
                    iconBgColor = Color(0xFFF5F5F4)
                )
                ProfileMenuDivider()
                ProfileMenuItem(
                    icon = Icons.Default.Logout,
                    label = "Keluar",
                    subtitle = "Logout dari akunmu",
                    iconBgColor = SoftPinkBg,
                    labelColor = SoftPink
                )
            }
        }
    }
}

@Composable
private fun ProfileMenuItem(
    icon: ImageVector,
    label: String,
    subtitle: String,
    iconBgColor: Color,
    labelColor: Color = InkBlack,
    trailingBadge: String? = null
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { /* TODO: Handle navigation */ }
            .padding(horizontal = 16.dp, vertical = 14.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Icon box
        Box(
            modifier = Modifier
                .size(40.dp)
                .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 10.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(iconBgColor),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = InkBlack,
                modifier = Modifier.size(20.dp)
            )
        }

        Spacer(modifier = Modifier.width(12.dp))

        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = label,
                fontWeight = FontWeight.SemiBold,
                fontSize = 14.sp,
                color = labelColor
            )
            Text(
                text = subtitle,
                fontSize = 11.sp,
                color = InkMuted
            )
        }

        if (trailingBadge != null) {
            Box(
                modifier = Modifier
                    .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 4.dp)
                    .clip(RoundedCornerShape(4.dp))
                    .background(WarmYellow)
                    .padding(horizontal = 6.dp, vertical = 2.dp)
            ) {
                Text(
                    text = trailingBadge,
                    fontSize = 9.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = InkBlack
                )
            }
        } else {
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = null,
                tint = InkMuted,
                modifier = Modifier.size(18.dp)
            )
        }
    }
}

@Composable
private fun ProfileMenuDivider() {
    Divider(
        modifier = Modifier.padding(horizontal = 16.dp),
        color = Color(0xFFE4E4E7),
        thickness = 1.dp
    )
}

// ─────────────────────────────────────────────
//  ORDERS: History Card
// ─────────────────────────────────────────────
@Composable
private fun OrderHistoryCard(order: OrderHistory) {
    SketchCard(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp),
        cornerRadius = 12.dp,
        shadowOffset = 3.dp
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Product emoji preview
            Box(
                modifier = Modifier
                    .size(56.dp)
                    .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 10.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(Color(order.productColorHex)),
                contentAlignment = Alignment.Center
            ) {
                Text(text = order.productEmoji, fontSize = 26.sp)
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = order.productTitle,
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    color = InkBlack,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "${order.id} · ${order.date}",
                    fontSize = 11.sp,
                    color = InkMuted
                )
                if (order.size != "-") {
                    Text(
                        text = "Ukuran ${order.size} · ${order.color}",
                        fontSize = 11.sp,
                        color = InkMuted
                    )
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = order.totalPrice.toRupiah(),
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 14.sp,
                    color = InkBlack
                )
            }

            // Status badge
            Box(
                modifier = Modifier
                    .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 6.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(Color(order.status.colorHex))
                    .padding(horizontal = 8.dp, vertical = 4.dp)
            ) {
                Text(
                    text = order.status.label,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = InkBlack
                )
            }
        }
    }
}

@Composable
private fun EmptyOrdersPlaceholder() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 40.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "📦", fontSize = 48.sp)
        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = "Belum ada pesanan",
            fontWeight = FontWeight.Bold,
            fontSize = 16.sp,
            color = InkBlack
        )
        Text(
            text = "Yuk, temukan karya favoritmu di katalog!",
            fontSize = 13.sp,
            color = InkMuted,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 32.dp, vertical = 4.dp)
        )
    }
}

// ─────────────────────────────────────────────
//  MY ARTS Placeholder
// ─────────────────────────────────────────────
@Composable
private fun MyArtsPlaceholder(uploadCount: Int) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        if (uploadCount == 0) {
            Text(text = "✏️", fontSize = 48.sp)
            Spacer(modifier = Modifier.height(12.dp))
            Text(
                text = "Belum ada karya",
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp,
                color = InkBlack
            )
            Text(
                text = "Upload karyamu di Studio dan mulai berjualan!",
                fontSize = 13.sp,
                color = InkMuted,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 24.dp, vertical = 4.dp)
            )
        } else {
            SketchCard(
                modifier = Modifier.fillMaxWidth(),
                backgroundColor = CreativeVioletSoft,
                cornerRadius = 12.dp,
                shadowOffset = 3.dp
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "🎨", fontSize = 32.sp)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "$uploadCount karya telah diupload",
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp,
                        color = InkBlack
                    )
                    Text(
                        text = "Kelola karya di Upload Studio",
                        fontSize = 12.sp,
                        color = InkMuted
                    )
                }
            }
        }
    }
}

// ─────────────────────────────────────────────
//  Edit Profile Dialog
// ─────────────────────────────────────────────
@Composable
private fun EditProfileDialog(
    name: String,
    bio: String,
    avatarEmoji: String,
    onNameChanged: (String) -> Unit,
    onBioChanged: (String) -> Unit,
    onAvatarSelected: (String) -> Unit,
    onSave: () -> Unit,
    onDismiss: () -> Unit
) {
    val avatarOptions = listOf("🎨", "🖌️", "✏️", "🎭", "🖼️", "🎴", "🎮", "🎵", "🏕️", "☕", "😂", "🌟")

    AlertDialog(
        onDismissRequest = onDismiss,
        containerColor = PaperCard,
        title = {
            Text(
                "Edit Profil",
                fontWeight = FontWeight.ExtraBold,
                fontSize = 18.sp,
                color = InkBlack
            )
        },
        text = {
            Column {
                // Avatar picker
                Text(
                    "Pilih Avatar",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    color = InkBlack
                )
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    avatarOptions.forEach { emoji ->
                        val isSelected = emoji == avatarEmoji
                        Box(
                            modifier = Modifier
                                .size(44.dp)
                                .then(
                                    if (isSelected) Modifier.sketchBorder(
                                        strokeWidth = 2.dp,
                                        borderColor = CreativeViolet,
                                        shadowOffset = 2.dp,
                                        cornerRadius = 22.dp
                                    )
                                    else Modifier.sketchBorderLight(
                                        strokeWidth = 1.dp,
                                        cornerRadius = 22.dp
                                    )
                                )
                                .clip(CircleShape)
                                .background(if (isSelected) CreativeVioletSoft else PaperBackground)
                                .clickable { onAvatarSelected(emoji) },
                            contentAlignment = Alignment.Center
                        ) {
                            Text(text = emoji, fontSize = 20.sp)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                // Name field
                Text(
                    "Nama",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    color = InkBlack
                )
                Spacer(modifier = Modifier.height(4.dp))
                OutlinedTextField(
                    value = name,
                    onValueChange = onNameChanged,
                    singleLine = true,
                    modifier = Modifier
                        .fillMaxWidth()
                        .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 10.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Transparent,
                        unfocusedBorderColor = Color.Transparent,
                        focusedContainerColor = PaperBackground,
                        unfocusedContainerColor = PaperBackground
                    ),
                    shape = RoundedCornerShape(10.dp),
                    placeholder = { Text("Nama tampilan kamu", color = InkMuted, fontSize = 13.sp) }
                )

                Spacer(modifier = Modifier.height(10.dp))

                // Bio field
                Text(
                    "Bio",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    color = InkBlack
                )
                Spacer(modifier = Modifier.height(4.dp))
                OutlinedTextField(
                    value = bio,
                    onValueChange = onBioChanged,
                    maxLines = 3,
                    modifier = Modifier
                        .fillMaxWidth()
                        .sketchBorderLight(strokeWidth = 1.dp, cornerRadius = 10.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = Color.Transparent,
                        unfocusedBorderColor = Color.Transparent,
                        focusedContainerColor = PaperBackground,
                        unfocusedContainerColor = PaperBackground
                    ),
                    shape = RoundedCornerShape(10.dp),
                    placeholder = { Text("Ceritakan tentang dirimu...", color = InkMuted, fontSize = 13.sp) }
                )
            }
        },
        confirmButton = {
            SketchButton(
                text = "Simpan",
                onClick = onSave,
                backgroundColor = CreativeViolet
            )
        },
        dismissButton = {
            SketchButton(
                text = "Batal",
                onClick = onDismiss,
                backgroundColor = PaperBackground,
                textColor = InkBlack
            )
        }
    )
}
