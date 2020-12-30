-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 21 2020 г., 08:30
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `server_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 2, 'Goddamn slaves!', '2020-12-16 09:39:48', '2020-12-18 01:58:15'),
(15, 3, 'My new comment!', '2020-12-16 12:24:18', '2020-12-16 12:24:18'),
(16, 1, 'Да это я, Администратор!', '2020-12-16 15:48:07', '2020-12-16 15:48:07'),
(17, 1, 'Новый коммент', '2020-12-20 19:04:14', '2020-12-20 19:04:14'),
(18, 1, 'Еще один коммент', '2020-12-20 19:04:22', '2020-12-20 19:04:22');

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2020_12_08_100556_create_products_table', 1),
(3, '2020_12_16_091705_create_comments_table', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `image` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Peace', 'Aint no fortunate son', 999, 'data:image/jpeg;base64,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', '2020-12-16 09:35:46', '2020-12-18 01:59:45'),
(9, 'Бутылка', 'Незаменимый помощник при жажде', 15, 'https://aquaphor.com/media/products/bottle_green_exp_hq2.png', '2020-12-20 20:36:16', '2020-12-20 20:36:16'),
(10, 'Толстовка', 'Согреет тело и душу', 45, 'https://4frag.ru/image/cache/data/product/navi-zipped-hoodie-1-1000x1000.jpg', '2020-12-20 20:37:00', '2020-12-20 20:37:00'),
(11, 'Штаны', 'Лучше брать коричневые', 30, 'data:image/jpeg;base64,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', '2020-12-20 20:39:07', '2020-12-20 20:39:07');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `api_token` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `api_token`, `created_at`, `updated_at`) VALUES
(1, 'Давид', 'Элиаури', 'cooladmin@mail.ru', '$2y$10$CBRCjhgOfgUKzhVRHOG/lupiAleH5imbHh/aaW03h7k.t08YIJGgW', '3yFs5jepdRVddKGWmjV8la3HZk4wm77WffjEIv9XLQOFKfp9ngIG6bpA0TFbXiAQRR5EGXqYnfbjd99a', '2020-12-16 09:33:58', '2020-12-16 09:33:58'),
(2, 'Айзек', 'Айвазовский', 'example@mail.ru', '$2y$10$lP0ncycESQgkllFfb4yL9OIzkuj.SpoL9SPyHVWgStAAzCM5AmHr2', 'znGHU936sVXexErjXcitzdPOYsJ63MZOPC4et0LYhWGOEH3t2ugU3F4C8KWNyrniSELBfdE6iH7KUCNE', '2020-12-16 09:38:24', '2020-12-16 09:38:24'),
(3, 'Алексей', 'Сатурдяй', 'saturday@mail.ru', '$2y$10$CtN6zsfG0pYbqavWlOrd1.jALtGAFonVklc3Tclwsjtx1jLLGzImG', 'f3mXVnOlonVD3GdJ5kwddKq1WqhvvZZE7xf5wiGcRknYuOOECdsXk8g8scppSeqTZBjGcZinEWg6nvnZ', '2020-12-16 10:06:53', '2020-12-16 10:06:53'),
(4, 'David', 'Eliauri', 'coolguy2248@mail.ru', '$2y$10$vYj5JDMTzZVP9LYT2emQ9ujZJJrrjPIOn/qvufJdWZpPQTtHb84Ae', 'kxYP81S1Pr7jlIJongPK4610B4yb7zCOgcPujOYeOrz58czR1M3t9MKEKSlsGtnYq99kNLSRvvSt6p9w', '2020-12-16 10:37:21', '2020-12-16 10:37:21');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_index` (`user_id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_api_token_unique` (`api_token`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
