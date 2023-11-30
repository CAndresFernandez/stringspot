<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231130152246 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE court DROP FOREIGN KEY FK_63AE193F9F2C3FAB');
        $this->addSql('DROP INDEX IDX_63AE193F9F2C3FAB ON court');
        $this->addSql('ALTER TABLE court DROP zone_id, DROP name');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE court ADD zone_id INT NOT NULL, ADD name VARCHAR(64) NOT NULL');
        $this->addSql('ALTER TABLE court ADD CONSTRAINT FK_63AE193F9F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_63AE193F9F2C3FAB ON court (zone_id)');
    }
}
