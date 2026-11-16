package com.arttale.app.data.repository

import com.arttale.app.domain.model.Product
import com.arttale.app.domain.model.Tribe
import com.arttale.app.domain.repository.ProductRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ProductRepositoryImpl @Inject constructor() : ProductRepository {

    private val seedProducts = listOf(
        Product(
            id = 1,
            title = "Cosmic Cat Vibes",
            artist = "Rara Doodles",
            price = 145_000,
            category = "Pakaian",
            style = "Ilustrasi",
            emoji = "🐱",
            hexColor = 0xFF141414,
            bestseller = true,
            description = "Kucing antariksa yang sedang berselancar di galaksi nebula. Desain eksklusif dengan detail line-art tajam."
        ),
        Product(
            id = 2,
            title = "Local Brew Forever",
            artist = "Kopi & Kanvas",
            price = 65_000,
            category = "Stiker",
            style = "Tipografi",
            emoji = "☕",
            hexColor = 0xFFFEF3C7,
            description = "Dedikasi untuk para pecinta seduhan manual lokal nusantara. Tahan air & tahan gores."
        ),
        Product(
            id = 3,
            title = "Pegunungan Sunyi",
            artist = "Bumi Studio",
            price = 85_000,
            category = "Aksesoris",
            style = "Minimalis",
            emoji = "🏔️",
            hexColor = 0xFFF5F5F4,
            description = "Siluet minimalis puncak gunung dalam kabut pagi. Sentuhan tenang untuk aksesoris harian."
        ),
        Product(
            id = 4,
            title = "Senja di Jogja",
            artist = "Indra Lukis",
            price = 175_000,
            category = "Pakaian",
            style = "Vintage",
            emoji = "🌅",
            hexColor = 0xFFF3F0FF,
            bestseller = true,
            description = "Suasana magis Malioboro dan lampu temaram tugu Jogja bergaya retro vintage poster."
        ),
        Product(
            id = 5,
            title = "Garage Punk Dreams",
            artist = "Riot Press",
            price = 35_000,
            category = "Stiker",
            style = "Parodi",
            emoji = "🎸",
            hexColor = 0xFFFEE2E2,
            description = "Semangat indie underground DIY poster culture dalam bentuk stiker die-cut vinyl."
        ),
        Product(
            id = 6,
            title = "Nasi Goreng Society",
            artist = "Lapar Club",
            price = 155_000,
            category = "Pakaian",
            style = "Tipografi",
            emoji = "🍳",
            hexColor = 0xFFFEF9C3,
            description = "Klub rahasia pecinta nasgor gerobak malam hari dengan telur ceplok setengah matang."
        ),
        Product(
            id = 7,
            title = "Mountain Soul",
            artist = "Bumi Studio",
            price = 110_000,
            category = "Aksesoris",
            style = "Minimalis",
            emoji = "⛰️",
            hexColor = 0xFFD1FAE5,
            description = "Tote bag kanvas tebal dengan grafis pendakian jalur rimba."
        ),
        Product(
            id = 8,
            title = "Ngopi Dulu",
            artist = "Kopi & Kanvas",
            price = 95_000,
            category = "Home & Art",
            style = "Tipografi",
            emoji = "☕",
            hexColor = 0xFFEDE9FE,
            description = "Mug keramik tebal dengan lettering khas warung kopi artisan."
        ),
        Product(
            id = 9,
            title = "Pixel Wibu Forever",
            artist = "Otaku Press",
            price = 45_000,
            category = "Stiker",
            style = "Ilustrasi",
            emoji = "🎴",
            hexColor = 0xFFFCE7F3,
            description = "Karya pixel art nostalgia era 16-bit game dengan karakter mecha nusantara."
        ),
        Product(
            id = 10,
            title = "Indie Tape Vol.3",
            artist = "Riot Press",
            price = 165_000,
            category = "Pakaian",
            style = "Vintage",
            emoji = "📼",
            hexColor = 0xFFE7E5E4,
            description = "Ilustrasi kaset pita mixtape 90-an nostalgia festival musik indie."
        ),
        Product(
            id = 11,
            title = "Hujan Jakarta",
            artist = "Indra Lukis",
            price = 125_000,
            category = "Home & Art",
            style = "Minimalis",
            emoji = "☔",
            hexColor = 0xFFDBEAFE,
            description = "Art print poster A3 dengan teknik watercolor menggambarkan jalanan basah Sudirman."
        ),
        Product(
            id = 12,
            title = "Receh Republic",
            artist = "Lapar Club",
            price = 40_000,
            category = "Stiker",
            style = "Parodi",
            emoji = "😂",
            hexColor = 0xFFFEF08A,
            description = "Kompilasi lelucon bapak-bapak dan meme lokal paling relatable."
        )
    )

    private val seedTribes = listOf(
        Tribe("anime-lokal", "Anime Lokal", "🎴", "12.4k", 1240, "+18%", "Karya bertema anime, manga, & pop kultur Jepang sentuhan lokal.", 0xFFFCE7F3),
        Tribe("gamer-merch", "Gamer Merch", "🎮", "9.1k", 890, "+12%", "Merch untuk para gamer—dari MOBA, RPG, hingga retro pixel art.", 0xFFEDE9FE),
        Tribe("indie-music", "Indie Music", "🎵", "5.8k", 640, "+24%", "Tribute scene musik indie, poster gigs, dan album art lokal.", 0xFFFEF3C7),
        Tribe("skena-kopi", "Skena Kopi", "☕", "3.2k", 420, "+8%", "Karya untuk barista, penikmat kopi, dan budaya kafe santai.", 0xFFF5F5F4),
        Tribe("pecinta-alam", "Pecinta Alam", "🏕️", "6.7k", 780, "+15%", "Karya outdoor, pendaki gunung, camping, dan keindahan alam.", 0xFFD1FAE5),
        Tribe("receh-republic", "Receh Republic", "😂", "21.3k", 1820, "+32%", "Meme, parodi, plesetan humor receh kelas berat penghilang stres.", 0xFFFEF9C3)
    )

    override fun getProducts(): Flow<List<Product>> = flowOf(seedProducts)

    override suspend fun getProductById(id: Int): Product? = seedProducts.find { it.id == id }

    override fun getTribes(): Flow<List<Tribe>> = flowOf(seedTribes)
}
