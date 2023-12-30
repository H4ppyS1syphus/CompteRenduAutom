# Assistant Compte Rendu de TP

![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/d0d042e9-e17c-4802-8a64-6e33c27348ce)


## Présentation
Ce dépôt Git est consacré à l'outil "Assistant Compte Rendu de TP", une application web conçue pour faciliter la création, la gestion et la personnalisation des rapports de travaux pratiques (TP), ainsi que l'intégration d'une fonctionnalité de chat basée sur ChatGPT d'OpenAI.

<p align="center">
  <img src="https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/5a401075-585a-48e7-a77b-492c56c1e147" alt="Gestion des images" width="500"/>
  <br>
  <em>Gestion des images</em>
</p>

## Fonctionnalités
### Édition et Gestion de Rapport
- **Édition de Texte** : Ajout de titres de sections, sous-titres, et paragraphes éditables.
- **Intégration de LaTeX** : Ajout de formules mathématiques via LaTeX.
- **Gestion des Images** : Fonction de glisser-déposer pour les images.
- **Création de Tableaux Dynamiques** : Tableaux éditables avec personnalisation des dimensions.
- **Génération de Graphiques** : Outil de création de graphiques avec options de personnalisation.
- **Thèmes d'Interface** : Basculement entre les thèmes clair et sombre.

<p align="center">
  <img src="https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/9185915c-f97f-4976-b298-df363d0a64d2" alt="Mode clair/sombre" width="500"/>
  <br>
  <em>Mode clair/sombre</em>
</p>
  
- **Exportation en HTML** : Génération et téléchargement de rapports en format HTML.

<p align="center">
  <img src="https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/7a9e511c-b895-49d0-b9f2-79c06c479fcd" alt="Gestion des graphiques" width="500"/>
  <br>
  <em>Gestion des graphiques</em>
</p>

<p align="center">
  <img src="https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/ab07a127-21ff-46a0-8eef-ec20de1da698" alt="UI simplifiée pour les régressions linéaires" width="500"/>
  <br>
  <em>UI simplifiée pour les régressions linéaires</em>
</p>


### Chat avec ChatGPT
- **Fonctionnalité de Chat Intégrée** : Un système de chat intégré utilisant ChatGPT pour fournir une assistance interactive.
- **Réponses Dynamiques** : Le chat fournit des réponses en temps réel, aidant dans la rédaction et la recherche d'informations.
- **Intégration LaTeX** : Intégration du LateX dans le chat
  
![Screencast from 2023-12-30 18-04-09](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/ed505d2a-689a-4745-96b6-a7f716ad30aa)


## Guide d'Utilisation

### Prérequis
- Clé API OpenAI.
- Agent ChatGPT configuré avec votre clé API.
  
### Obtenir les clés d'API et d'agent

1. Créer un compte OpenAi et activer la facturation
2. Créer une clé d'api OpenAI, sélectionner la version GPT souhaitée (GPT 4 est recommandée mais n'est pas obligatoire)

https://platform.openai.com/api-keys

3. Créer un assistant ChatGPT voir la [section prompt](##prompt) et copier coller le prompt. 

https://platform.openai.com/assistants


### Configuration
1. Clonez le dépôt Git sur votre machine.

```
git clone https://github.com/H4ppyS1syphus/CompteRenduAutom.git
```

2. Créer un environment python

```
pip install virtualenv
virtualenv monenv
```
*Unix ou Linux:* 
```
source monenv/bin/activate
```
*Windows:*
```
monenv\Scripts\activate
```
3. Installez les dépendances nécessaires.
```
pip install -r requirements.txt
```

4. Configurez votre clé API OpenAI ainsi que votre clé d'agent ChatGPT dans un fichier .env

![image](https://github.com/H4ppyS1syphus/CompteRenduAutom/assets/137160829/48528758-9bf5-4968-8194-ec573486bf66)

5. Lancer le programme
```
python3 -m main
```
6. Ouvrir votre navigateur web et aller à l'adresse

http://127.0.0.1:5000

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

-Mieux gérer le Latex dans la génération du code html.
-Générer directement des pdf plutot que passer par une page HTML


## Prompt
```
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
```
