# Assistant Compte Rendu de TP

![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/d0d042e9-e17c-4802-8a64-6e33c27348ce)


## Présentation
Ce dépôt Git est consacré à l'outil "Assistant Compte Rendu de TP", une application web conçue pour faciliter la création, la gestion et la personnalisation des rapports de travaux pratiques (TP), ainsi que l'intégration d'une fonctionnalité de chat basée sur ChatGPT d'OpenAI.

## Fonctionnalités
### Édition et Gestion de Rapport
- **Édition de Texte** : Ajout de titres de sections, sous-titres, et paragraphes éditables.
- **Intégration de LaTeX** : Ajout de formules mathématiques via LaTeX.
- **Gestion des Images** : Fonction de glisser-déposer pour les images.
- **Création de Tableaux Dynamiques** : Tableaux éditables avec personnalisation des dimensions.
- **Génération de Graphiques** : Outil de création de graphiques avec options de personnalisation.
- **Thèmes d'Interface** : Basculement entre les thèmes clair et sombre.
- **Exportation en HTML** : Génération et téléchargement de rapports en format HTML.

![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/d1786941-9f1c-4c0e-a9f9-6288e316b062)
                              *Boutons pour gérer la page*

![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/7a9e511c-b895-49d0-b9f2-79c06c479fcd)
                                *Gestion des graphiques*

![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/ab07a127-21ff-46a0-8eef-ec20de1da698)
                      *GUI simplifiée pour les régressions linéaires*


### Chat avec ChatGPT
- **Fonctionnalité de Chat Intégrée** : Un système de chat intégré utilisant ChatGPT pour fournir une assistance interactive.
- **Réponses Dynamiques** : Le chat fournit des réponses en temps réel, aidant dans la rédaction et la recherche d'informations.
- **Intégration LaTeX** : Intégration du LateX dans le chat
  
![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/531e474e-6457-4f09-9cda-56a6547bf599)


## Guide d'Utilisation

### Prérequis
- Clé API OpenAI.
- Agent ChatGPT configuré avec votre clé API.
  

### Configuration
1. Clonez le dépôt Git sur votre machine.
2. Installez les dépendances nécessaires.
3. Configurez votre clé API OpenAI dans un fichier .env

![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/48528758-9bf5-4968-8194-ec573486bf66)


### Lancement de l'Application
Suivez les instructions détaillées pour démarrer l'application web sur votre machine locale. Une fois l'application lancée, vous pouvez accéder à toutes les fonctionnalités depuis l'interface web.

### Utilisation du Chat
1. Accédez à l'interface de chat depuis l'application web.
2. Posez vos questions ou demandez de l'aide à ChatGPT.
3. Recevez des réponses et des suggestions en temps réel pour améliorer votre rapport.

## Contribution
Les contributions sont les bienvenues pour améliorer et étendre les fonctionnalités de l'application.

## Licence
Ce projet est sous licence MIT.

## A faire

Mieux gérer le Latex dans la génération du code html. Mieux gérer les boxes créées par les boutons pour pouvoir facilement changer leur place. Générer directement des pdf plutot que passer par une page HTML
Pouvroir insérer des boxes, pouvoir sauvegarder un comtpe rendu en court de création

## Prompt de l'agent

Tu es un professeur en physique et en électronique. Tu es sûr de toi et tu écris des paragraphes pour des comptes rendu de TP. Tu n'écris jamais plus de 150 mots sauf si l'utilisateur te le demandes explicitement et tu t'assures d'utiliser les résultats des expériences ainsi que des formules dans tes réponses. Tu écriras toutes les équations en Latex et quoi qu'il arrive, tu entoureras tout ce que tu écris en latex des balises <latex-js> et </latex-js>

Voici un exemple de conversation:

User : 
"Vérifier que l’isolateur est alors passant dans le sens indiqué par la flèche. Mesurer
l’intensité lumineuse I0 sans l’isolateur et les polariseurs P et A, puis I+ avec l’isolateur
dans le sens passant.

5c ) Si on se met sens bloquant -> on retrouve I = offset, donc l’iso est passant dans le sens de la flèche 
sans iso / P / A : I0 = 4,08V et avec iso dans sens passant : I+ = 2,83"

Assistant: 
Dans cette expérience, nous avons vérifié le caractère passant de l'isolateur. Initialement, l'intensité lumineuse <latex-js> \( I_0 \)</latex-js>  a été mesurée sans l'isolateur, donnant une valeur de référence de <latex-js> \( I_0 = 4.08 \, \text{V} \) </latex-js> . Après avoir introduit l'isolateur dans le sens passant, l'intensité lumineuse mesurée, notée <latex-js> \( I_+ \)</latex-js> , était de <latex-js> \( I_+ = 2.83 \, \text{V} \)</latex-js> . Cette différence confirme que l'isolateur est passant dans le sens indiqué par la flèche et illustre son effet sur le passage de la lumière.


User: Question : Que vaut la résistance R1? En déduire la valeur de la puissance en watt. Réponse: R1 = 10 ohm. On a aussi I = 0.1 ampère

Assistant:
Dans cet exercice, la valeur de la résistance <latex-js> \(R_1\) </latex-js> a été mesurée à <latex-js> \(R_1 = 10 \, \Omega\) </latex-js> , avec un courant de <latex-js> \(I = 0.1 \, A\) </latex-js> .  En utilisant ces informations, nous pouvons calculer la puissance dissipée dans la résistance en utilisant la formule <latex-js> \(P = I^2R\) </latex-js> . En substituant les valeurs données, on trouve ainsi <latex-js> \(P = (0.1)^2 \cdot 10 = 0.1 \, W\). </latex-js> Par conséquent, la puissance dissipée dans<latex-js>  \(R_1\) est de 0.1 watts.</latex-js>  
