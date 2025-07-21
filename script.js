const entreprises = [
  {
    id: "google",
    nom: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    couleur: "#4285F4",
  },
  {
    id: "apple",
    nom: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    couleur: "#999999",
  },
  {
    id: "microsoft",
    nom: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    couleur: "#F25022",
  },
  {
    id: "ibm",
    nom: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    couleur: "#006699",
  },
];


const entrepriseSelect = document.getElementById("entrepriseSelect");
const form = document.getElementById("signatureForm");
const signaturePreview = document.getElementById("signaturePreview");
const resultDiv = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

// Remplir la liste déroulante
entreprises.forEach((e) => {
  const option = document.createElement("option");
  option.value = e.id;
  option.textContent = e.nom;
  entrepriseSelect.appendChild(option);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const entreprise = entreprises.find((en) => en.id === data.get("entreprise"));

  const prenom = data.get("prenom").trim();
  const nom = data.get("nom").trim();
  const poste = data.get("poste").trim();
  const tel = data.get("tel").trim();
  const email = data.get("email").trim();

  const html = `
    <table>
      <tr>
        <td><img src="${entreprise.logo}" alt="${entreprise.nom} logo" /></td>
        <td style="padding-left:10px; border-left: 3px solid ${entreprise.couleur};">
          <strong style="color:${entreprise.couleur}; font-size:16px;">${prenom} ${nom}</strong><br/>
          <span>${poste}</span><br/>
          <span>Tél : ${tel}</span><br/>
          <a href="mailto:${email}" style="color:${entreprise.couleur}; text-decoration:none;">${email}</a>
        </td>
      </tr>
    </table>
  `;

  signaturePreview.innerHTML = html;
  resultDiv.style.display = "block";
});

// Copier la signature (visuelle)
copyBtn.addEventListener("click", () => {
  if (!signaturePreview.innerHTML) return alert("Génère d'abord ta signature !");

  // Crée un range pour sélectionner le contenu
  const range = document.createRange();
  range.selectNodeContents(signaturePreview);

  // Sélectionne le contenu
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  // Copie dans le presse-papier
  try {
    document.execCommand("copy");
    alert("Signature copiée ! Tu peux maintenant la coller dans ton mail.");
  } catch (err) {
    alert("Erreur lors de la copie.");
  }

  // Désélectionne
  selection.removeAllRanges();
});
