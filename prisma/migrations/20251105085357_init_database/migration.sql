-- CreateTable
CREATE TABLE `area` (
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(80) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` CHAR(26) NOT NULL,
    `review_id` CHAR(26) NOT NULL,
    `user_id` CHAR(26) NOT NULL,
    `restaurant_id` CHAR(26) NOT NULL,
    `content` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,
    `updated_at` DATETIME(0) NULL,

    INDEX `FK_review_TO_comment_1`(`review_id`),
    INDEX `FK_user_TO_comment_1`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` CHAR(26) NOT NULL,
    `type` ENUM('KOR', 'JAP', 'CHN') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry` (
    `id` CHAR(26) NOT NULL,
    `inquiry_category_id` CHAR(26) NOT NULL,
    `user_id` CHAR(26) NOT NULL,
    `title` VARCHAR(100) NULL,
    `content` TEXT NULL,
    `status` ENUM('RESOLVED', 'PENDING', 'PROGRESS') NULL,
    `created_at` DATETIME(6) NULL,

    INDEX `FK_inquiry_category_TO_inquiry_1`(`inquiry_category_id`),
    INDEX `FK_user_TO_inquiry_1`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry_category` (
    `id` CHAR(26) NOT NULL,
    `type` ENUM('SERVICE', 'BUG') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry_img` (
    `id` CHAR(26) NOT NULL,
    `inquiry_id` CHAR(26) NOT NULL,
    `url` VARCHAR(255) NULL,

    UNIQUE INDEX `UK_INQUIRY_IMG_ID_URL`(`inquiry_id`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` CHAR(26) NOT NULL,
    `restaurant_id` CHAR(26) NOT NULL,
    `area_id` CHAR(26) NOT NULL,
    `content` VARCHAR(100) NULL,
    `price` INTEGER NULL,
    `point` INTEGER NULL,
    `deadline` DATETIME(0) NULL,
    `created_at` DATETIME(6) NULL,

    INDEX `FK_area_TO_mission_1`(`area_id`),
    UNIQUE INDEX `UK_MISSION_RESTAURANT_NUMBER`(`restaurant_id`, `area_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notice` (
    `id` CHAR(26) NOT NULL,
    `user_id` CHAR(26) NOT NULL,
    `type` ENUM('EVENT', 'COMMENT', 'INQUIRY') NULL,
    `target_id` CHAR(26) NULL,
    `read_status` TINYINT NULL,
    `content` VARCHAR(100) NULL,
    `created_at` DATETIME(6) NULL,

    INDEX `FK_user_TO_notice_1`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point` (
    `id` CHAR(26) NOT NULL,
    `mission_id` CHAR(26) NOT NULL,
    `restaurant_id` CHAR(26) NOT NULL,
    `area_id` CHAR(26) NOT NULL,
    `user_id` CHAR(26) NOT NULL,
    `point_transaction` INTEGER NULL,

    INDEX `FK_mission_TO_point_1`(`mission_id`),
    UNIQUE INDEX `UK_POINT_USER_MISSION`(`user_id`, `mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant` (
    `id` CHAR(26) NOT NULL,
    `area_id` CHAR(26) NOT NULL,
    `name` VARCHAR(100) NULL,
    `phone_number` VARCHAR(20) NULL,
    `location` VARCHAR(100) NULL,
    `lat` FLOAT NULL,
    `lng` FLOAT NULL,
    `created_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `UK_RESTAURANT_AREA_NAME`(`area_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_food_category` (
    `restaurant_id` CHAR(26) NOT NULL,
    `area_id` CHAR(26) NOT NULL,
    `foot_category_id` CHAR(26) NOT NULL,

    INDEX `FK_food_category_TO_restaurant_food_category_1`(`foot_category_id`),
    PRIMARY KEY (`restaurant_id`, `foot_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` CHAR(26) NOT NULL,
    `user_id` CHAR(26) NOT NULL,
    `restaurant_id` CHAR(26) NOT NULL,
    `score` INTEGER NULL,
    `content` VARCHAR(255) NULL,
    `img_url` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(0) NULL,
    `deleted_at` DATETIME(0) NULL,

    INDEX `FK_restaurant_TO_review_1`(`restaurant_id`),
    UNIQUE INDEX `UK_REVIEW_USER_RESTAURANT`(`user_id`, `restaurant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_img` (
    `id` CHAR(26) NOT NULL,
    `user_id` CHAR(26) NOT NULL,
    `restaurant_id` CHAR(26) NOT NULL,
    `review_id` CHAR(26) NOT NULL,
    `url` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NULL,

    UNIQUE INDEX `UK_REVIEW_IMG_REVIEW_URL`(`review_id`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` CHAR(26) NOT NULL,
    `name` VARCHAR(20) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'NONE') NULL,
    `birth` DATE NULL,
    `email` VARCHAR(40) NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `profile_url` VARCHAR(255) NULL,
    `location` VARCHAR(255) NULL,
    `point` INTEGER NULL,
    `verified` TINYINT NULL,
    `notice_status` TINYINT NULL,
    `created_at` DATETIME(0) NULL DEFAULT (now()),
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `UK_USER_EMAIL`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_area` (
    `user_id` CHAR(26) NOT NULL,
    `area_id` CHAR(26) NOT NULL,

    INDEX `FK_area_TO_user_area_1`(`area_id`),
    PRIMARY KEY (`user_id`, `area_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_food_category` (
    `user_id` CHAR(26) NOT NULL,
    `food_category_id` CHAR(26) NOT NULL,

    INDEX `FK_food_category_TO_user_food_category_1`(`food_category_id`),
    PRIMARY KEY (`user_id`, `food_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mission` (
    `user_id` CHAR(26) NOT NULL,
    `mission_id` CHAR(26) NOT NULL,
    `restaurant_id` CHAR(26) NOT NULL,
    `area_id` CHAR(26) NOT NULL,
    `status` TINYINT NULL,

    INDEX `FK_mission_TO_user_mission_1`(`mission_id`),
    PRIMARY KEY (`user_id`, `mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `FK_review_TO_comment_1` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `FK_user_TO_comment_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inquiry` ADD CONSTRAINT `FK_inquiry_category_TO_inquiry_1` FOREIGN KEY (`inquiry_category_id`) REFERENCES `inquiry_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inquiry` ADD CONSTRAINT `FK_user_TO_inquiry_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inquiry_img` ADD CONSTRAINT `FK_inquiry_TO_inquiry_img_1` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiry`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `FK_restaurant_TO_mission_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notice` ADD CONSTRAINT `FK_user_TO_notice_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `FK_mission_TO_point_1` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `FK_user_TO_point_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant` ADD CONSTRAINT `FK_area_TO_restaurant_1` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_food_category` ADD CONSTRAINT `FK_food_category_TO_restaurant_food_category_1` FOREIGN KEY (`foot_category_id`) REFERENCES `food_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `restaurant_food_category` ADD CONSTRAINT `FK_restaurant_TO_restaurant_food_category_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `FK_restaurant_TO_review_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `FK_user_TO_review_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review_img` ADD CONSTRAINT `FK_review_TO_review_img_1` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_area` ADD CONSTRAINT `FK_area_TO_user_area_1` FOREIGN KEY (`area_id`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_area` ADD CONSTRAINT `FK_user_TO_user_area_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_food_category` ADD CONSTRAINT `FK_food_category_TO_user_food_category_1` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_food_category` ADD CONSTRAINT `FK_user_TO_user_food_category_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `FK_mission_TO_user_mission_1` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `FK_user_TO_user_mission_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
