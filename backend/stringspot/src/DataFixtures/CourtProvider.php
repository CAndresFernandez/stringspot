<?php
namespace App\DataFixtures;

class CourtProvider {
// Paris, FR tennis courts
    private $parisTennisCourts = [
        "75004" => [
            "Tennis Neuve Saint-Pierre" => [
                "5 rue Neuve Saint-Pierre" => [
                    48.85360067133477,
                    2.3636567975111964
                    ]]
        ],
        "75005" => [
            "Tennis Poliveau" => [
                "39 rue Poliveau" => [
                48.83982465120855,
                2.3576705174454338
                ]]
        ],
        "75006" => [
            "Tennis du Luxembourg" => [
                "3 rue Guynemer" => [
                48.84845911190612,
                2.3328125975109693
                ]]
        ],
        "75009" => [
            "Tennis Valeyre" => [
                "24 rue de Rochechouart" => [
                48.87790059140562,
                2.345121084019975
                ]]
        ],
        "75011" => [
            "Tennis Candie" => [
                "11 rue de Candie" => [
                48.851413010240755,
                2.380224997511126
                ]],
            "Tennis Philippe Auguste" => [
                "108 avenue Philippe Auguste" => [
                48.856770653398975,
                2.3910616110035825
                ]],
            "Tennis Thiéré" => [
                "9t-11 passage Thiéré" => [
                48.85372405253969,
                2.3740620398393686
                ]]
        ],
        "75012" => [
            "Tennis Alain Mimoun" => [
                "15 rue de la Nouvelle-Calédonie" => [
                48.83827060975584,
                2.4106673686746127
                ]],
            "Tennis Carnot" => [
                "26 boulevard Carnot" => [
                48.84310567133347,
                2.412516526346664
                ]],
            "Tennis La Faluère" => [
                "113 route de la Pyramide" => [
                48.83412922141668,
                2.4416995471531195
                ]],
            "Tennis Léo Lagrange" => [
                "1 avenue de la porte de Charenton" => [
                48.83106957942922,
                2.3992219303672373
                ]]
        ],
        "75013" => [
            "Tennis Château des Rentiers" => [
                "184 rue du château des Rentiers" => [
                48.83065878338461,
                2.363070641689792
                ]],
            "Tennis Dunois" => [
                "66 rue Dunois" => [
                48.83290879600069,
                2.367383026346238
                ]],
            "Tennis Cordelières" => [
                "35 rue des Cordelières" => [
                48.833261295901444,
                2.348516797510338
                ]],
            "Tennis Georges Carpentier" => [
                "81 boulevard Masséna" => [
                48.820468671330346,
                2.367387039837922
                ]],
            "Tennis Charles Moureu" => [
                "17 avenue Edison" => [
                48.82767545598873,
                2.3640848975101365
                ]],
            "Tennis Poterne des Peupliers" => [
                "17 rue Max Jacob" => [
                48.82034157133036,
                2.354036326345692
                ]]
        ],
        "75014" => [
            "Tennis Friant" => [
                "6 rue de Coulmiers" => [
                48.82477763481093,
                2.324880553330374
                ]],
            "Tennis Elisabeth" => [
                "7 avenue Paul Appell" => [
                48.820884707302895,
                2.3293020263457107
                ]]
        ],
        "75015" => [
            "Tennis Croix Nivert" => [
                "107 rue de la Croix-Nivert" => [
                48.84191577133329,
                2.2952240398388826
                ]],
            "Tennis Suzanne Lenglen" => [
                "2 rue Louis Armand" => [
                48.83027640862775,
                2.2740632398383767
                ]],
            "Tennis Charles Rigoulot" => [
                "18 avenue de la porte de Briançon" => [
                48.82665330799564,
                2.3003361553920816
                ]],
            "Tennis de la Plaine" => [
                "13 rue du Général Guillaumat" => [
                48.82782104511271,
                2.2935371974835586
                ]],
            "Tennis André et René Mourlon" => [
                "19 rue Gaston de Caillavet" => [
                48.84890387121464,
                2.284945826320343
                ]],
            "Tennis Sablonnière" => [
                "62 Rue Cambronne" => [
                48.84403807121402,
                2.301935497484267
                ]],
        ],
        "75016" => [
            "Tennis Henry de Montherlant" => [
                "30 Boulevard Lannes" => [
                48.86754812866686,
                2.2717029974852796
                ]],
            "Tennis Niox" => [
                "16 Quai Saint Exupéry" => [
                48.83696809473724,
                2.2641052686480863
                ]],
            "Tennis Fonds des Princes" => [
                "61 avenue de la Porte d’Auteuil" => [
                48.84788917011989,
                2.24371041097685
                ]],
        ],
        "75017" => [
            "Tennis Max Rousié" => [
                "28 Rue André Brechet" => [
                48.899062089497086,
                2.325167233175866
                ]],
            "Tennis Reims" => [
                "224 Rue de Courcelles" => [
                48.888544925707855,
                2.294235912829667
                ]],
            "Tennis Aurelles de Paladines" => [
                "17 Boulevard d’Aurelle de Paladines" => [
                48.88310598173065,
                2.282017824470741
                ]],
            "Tennis Courcelles" => [
                "209 Rue de Courcelles" => [
                48.889266753685924,
                2.2925612686503314
                ]],
            "Tennis de la Porte d’Asnières" => [
                "1 Boulevard de Reims" => [
                48.89044806578489,
                2.2990498626212705
                ]],
        ],
        "75018" => [
            "Tennis Bertrand Dauvin" => [
                "12 Rue René Binet" => [
                48.90058266260104,
                2.3431457266045235
                ]],
            "Tennis Championnet" => [
                "172 Rue Championnet" => [
                48.89503517644905,
                2.3348547935375104
                ]],
            "Tennis des Poissonniers" => [
                "2 Rue Jean Cocteau" => [
                48.9001614240705,
                2.3507351686508304
                ]],
        ],
        "75019" => [
            "Tennis Jandelle" => [
                "15 Cité Jandelle" => [
                48.87531625560766,
                2.3796557291528875
                ]],
            "Tennis Jules Ladoumègue" => [
                "1 Avenue de la porte de Pantin" => [
                48.892823166468865,
                2.3969063811923466
                ]],
            "Tennis Edouard Pailleron" => [
                "22 Rue Edouard Pailleron" => [
                48.880239869133504,
                2.376927839241627
                ]],
            "Tennis Sept Arpents" => [
                "9 Rue des sept Arpents" => [
                48.88977935757651,
                2.3986287962259456
                ]],
        ],
        "75020" => [
            "Tennis Louis Lumière" => [
                "30 Rue Louis Lumière" => [
                48.858758164672366,
                2.411836512828368
                ]],
            "Tennis Les Amandiers" => [
                "21 Rue des Cendriers" => [
                48.865610185319625,
                2.3865360637924375
                ]],
            "Tennis de la Porte de Bagnolet" => [
                "72 Rue Louis Lumière" => [
                48.862463438559345,
                2.4117362398133677
                ]],
            "Tennis Déjerine" => [
                "32 Rue des docteurs Dejerine" => [
                48.85595152162681,
                2.4121372642393233
                ]],
        ]
    ];


    public function parisTennisCourts() {
        return $this->parisTennisCourts;
    }

}


