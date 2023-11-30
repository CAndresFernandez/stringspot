<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231130162424 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE center ADD courts_number INT NOT NULL');
        $this->addSql('ALTER TABLE court DROP FOREIGN KEY FK_63AE193FC0B95842');
        $this->addSql('DROP INDEX IDX_63AE193FC0B95842 ON court');
        $this->addSql('ALTER TABLE court CHANGE center_id_id center_id INT NOT NULL');
        $this->addSql('ALTER TABLE court ADD CONSTRAINT FK_63AE193F5932F377 FOREIGN KEY (center_id) REFERENCES center (id)');
        $this->addSql('CREATE INDEX IDX_63AE193F5932F377 ON court (center_id)');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C849559D86650F');
        $this->addSql('DROP INDEX UNIQ_42C849559D86650F ON reservation');
        $this->addSql('ALTER TABLE reservation CHANGE user_id_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_42C84955A76ED395 ON reservation (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE center DROP courts_number');
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955A76ED395');
        $this->addSql('DROP INDEX UNIQ_42C84955A76ED395 ON reservation');
        $this->addSql('ALTER TABLE reservation CHANGE user_id user_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849559D86650F FOREIGN KEY (user_id_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_42C849559D86650F ON reservation (user_id_id)');
        $this->addSql('ALTER TABLE court DROP FOREIGN KEY FK_63AE193F5932F377');
        $this->addSql('DROP INDEX IDX_63AE193F5932F377 ON court');
        $this->addSql('ALTER TABLE court CHANGE center_id center_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE court ADD CONSTRAINT FK_63AE193FC0B95842 FOREIGN KEY (center_id_id) REFERENCES center (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_63AE193FC0B95842 ON court (center_id_id)');
    }
}
