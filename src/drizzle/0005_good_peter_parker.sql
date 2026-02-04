DROP TABLE "user_onboarding" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboarding_step" text DEFAULT 'integrations' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboarded_at" timestamp;