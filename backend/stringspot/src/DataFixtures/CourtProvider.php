<?php
namespace App\DataFixtures;

class CourtProvider {

    private $courtList = [
        "75004" => [
            "Tennis Neuve Saint-Pierre" => "5 rue Neuve Saint-Pierre"
        ],
        "75005" => [
            "Tennis Poliveau" => "39 rue Poliveau"
        ],
        "75006" => [
            "Tennis du Luxembourg" => "3 rue Guynemer"
        ],
        "75009" => [
            "Tennis Valeyre" => "24 rue de Rochechouart"
        ],
        "75011" => [
            "Tennis Candie" => "11 rue de Candie",
            "Tennis Philippe Auguste" => "108 avenue Philippe Auguste",
            "Tennis Thiéré" => "9t-11 passage Thiéré"
        ],
        "75012" => [
            "Tennis Alain Mimoun" => "15 rue de la Nouvelle-Calédonie",
            "Tennis Carnot" => "26 boulevard Carnot",
            "Tennis La Faluère" => "route de la Pyramide",
            "Tennis Léo Lagrange" => "1 avenue de la porte de Charenton"
        ],
        "75013" => [
            "Tennis Château des Rentiers" => "184 rue du château des Rentiers",
            "Tennis Dunois" => "66 rue Dunois",
            "Tennis de la Poterne des Peupliers" => "1 rue Max Jacob",
            "Tennis Cordelières" => "35 rue des Cordelières",
            "Tennis Georges Carpentier" => "81 boulevard Masséna",
            "Tennis Charles Moureu" => "17 avenue Edison",
            "Tennis Poterne des Peupliers" => "17 rue Max Jacob"
        ],
        "75014" => [
            "Tennis Friant" => "6 rue de Coulmiers",
            "Tennis Elisabeth" => "7 avenue Paul Appell"
        ],
        "75015" => [
            "Tennis Croix Nivert" => "107 rue de la Croix-Nivert",
            "Tennis Suzanne Lenglen" => "2 rue Louis Armand",
            "Tennis Charles Rigoulot" => "18 avenue de la porte de Briançon",
            "Tennis de la Plaine" => "13 rue du Général Guillaumat",
            "Tennis André et René Mourlon" => "19 rue Gaston de Caillavet",
            "Tennis Sablonnière" => "62 Rue Cambronne",
        ],
        "75016" => [
            "Tennis Henry de Montherlant" => "30 Boulevard Lannes",
            "Tennis Niox" => "16 Quai Saint Exupéry",
            "Tennis Fonds des Princes" => "61 avenue de la Porte d’Auteuil",
        ],
        "75017" => [
            "Tennis Max Rousié" => "28 Rue André Brechet",
            "Tennis Reims" => "224 Rue de Courcelles",
            "Tennis Aurelles de Paladines" => "17 Boulevard d’Aurelle de Paladines",
            "Tennis Courcelles" => "209 Rue de Courcelles",
            "Tennis de la Porte d’Asnières" => "1 Boulevard de Reims",
        ],
        "75018" => [
            "Tennis Bertrand Dauvin" => "12 Rue René Binet",
            "Tennis Championnet" => "172 Rue Championnet",
            "Tennis des Poissonniers" => "2 Rue Jean Cocteau",
        ],
        "75019" => [
            "Tennis Jandelle" => "15 Cité Jandelle",
            "Tennis Jules Ladoumègue" => "1 Avenue de la porte de Pantin",
            "Tennis Edouard Pailleron" => "22 Rue Edouard Pailleron",
            "Tennis Sept Arpents" => "9 Rue des sept Arpents",
        ],
        "75020" => [
            "Tennis Louis Lumière" => "30 Rue Louis Lumière",
            "Tennis Les Amandiers" => "21 Rue des Cendriers",
            "Tennis de la Porte de Bagnolet" => "72 Rue Louis Lumière",
            "Tennis Davout" => "134 Boulevard Davout",
            "Tennis Déjerine" => "32 Rue des docteurs Dejerine",
        ]
    ];

    public function tennisCourts() {
        return $this->courtList;
    }

}


