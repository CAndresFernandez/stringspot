<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231130153512 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE center (id INT AUTO_INCREMENT NOT NULL, zone_id INT NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, INDEX IDX_40F0EB249F2C3FAB (zone_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE center ADD CONSTRAINT FK_40F0EB249F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)');
        $this->addSql('ALTER TABLE court ADD center_id_id INT NOT NULL, DROP address');
        $this->addSql('ALTER TABLE court ADD CONSTRAINT FK_63AE193FC0B95842 FOREIGN KEY (center_id_id) REFERENCES center (id)');
        $this->addSql('CREATE INDEX IDX_63AE193FC0B95842 ON court (center_id_id)');
        $this->addSql('ALTER TABLE reservation ADD user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849559D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_42C849559D86650F ON reservation (user_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE court DROP FOREIGN KEY FK_63AE193FC0B95842');
        $this->addSql('ALTER TABLE center DROP FOREIGN KEY FK_40F0EB249F2C3FAB');
        $this->addSql('DROP TABLE center');
        $this->addSql('DROP INDEX IDX_63AE193FC0B95842 ON court');
        $this->addSql('ALTER TABLE court ADD address VARCHAR(255) NOT NULL, DROP center_id_id');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C849559D86650F');
        $this->addSql('DROP INDEX UNIQ_42C849559D86650F ON reservation');
        $this->addSql('ALTER TABLE reservation DROP user_id_id');
    }
}
