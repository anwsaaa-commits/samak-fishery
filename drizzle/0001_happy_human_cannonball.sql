CREATE TABLE `boats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`code` varchar(40) NOT NULL,
	`captain` varchar(120),
	`status` enum('ready','at_sea','maintenance') NOT NULL DEFAULT 'ready',
	`crewCount` int NOT NULL DEFAULT 0,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `boats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fishers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`role` varchar(80) NOT NULL DEFAULT 'صياد',
	`phone` varchar(30),
	`address` varchar(220),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fishers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `preparations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`boatId` int NOT NULL,
	`tripId` int,
	`category` enum('food','fuel','equipment') NOT NULL,
	`itemName` varchar(160) NOT NULL,
	`quantity` decimal(12,2) NOT NULL DEFAULT '1',
	`unit` varchar(30) NOT NULL DEFAULT 'وحدة',
	`cost` decimal(12,2) NOT NULL DEFAULT '0',
	`isReady` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `preparations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`boatId` int,
	`tripId` int,
	`fisherId` int,
	`type` enum('income','expense') NOT NULL,
	`category` varchar(80) NOT NULL,
	`description` varchar(220) NOT NULL,
	`amount` decimal(12,2) NOT NULL,
	`transactionDate` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` int AUTO_INCREMENT NOT NULL,
	`boatId` int NOT NULL,
	`title` varchar(160) NOT NULL,
	`status` enum('planned','active','completed') NOT NULL DEFAULT 'planned',
	`departureAt` timestamp,
	`returnAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `trips_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `preparations` ADD CONSTRAINT `preparations_boatId_boats_id_fk` FOREIGN KEY (`boatId`) REFERENCES `boats`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `preparations` ADD CONSTRAINT `preparations_tripId_trips_id_fk` FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_boatId_boats_id_fk` FOREIGN KEY (`boatId`) REFERENCES `boats`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_tripId_trips_id_fk` FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_fisherId_fishers_id_fk` FOREIGN KEY (`fisherId`) REFERENCES `fishers`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `trips` ADD CONSTRAINT `trips_boatId_boats_id_fk` FOREIGN KEY (`boatId`) REFERENCES `boats`(`id`) ON DELETE cascade ON UPDATE no action;