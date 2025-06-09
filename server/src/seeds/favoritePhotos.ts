import db from '../config/connection.js'
import FavoriteModel from '../models/favorite.js';

console.log("-----DELETING FAVORITES-----")
await FavoriteModel.deleteMany();
console.log("-----FAVORITES DELETED-----")

console.log("-----INSERTING FAVORITES-----")
const fav1 = new FavoriteModel({
  title: 'Between Scylla and Charybdis: A Double Cosmic Discovery',
  url: 'https://apod.nasa.gov/apod/image/2506/ScyllaB_LerouxGere_960.jpg',
  date: '2025-06-09',
  explanation: 'Can you identify this celestial object?  Likely not — because this is a discovery image.  Massive stars forge heavy elements in their cores and, after a few million years, end their lives in powerful supernova explosions. These remnants cool relatively quickly and fade, making them difficult to detect.  To uncover such faint, previously unknown supernova remnants, a dedicated group of amateur astrophotographers searched through sky surveys for possible supernova remnant candidates.  The result: the first-ever image of supernova remnant G115.5+9.1 — named Scylla by its discoverers—glowing faintly in the constellation of the mythological King of Aethiopia: Cepheus.  Emission from hydrogen atoms in the remnant is shown in red, and faint emission from oxygen is shown in hues of blue.  Surprisingly, another discovery lurked to the upper right: a faint, previously unknown planetary nebula candidate. In keeping with mythological tradition, it was named Charybdis (Sai 2) — a nod to the ancient Greek expression "caught between Scylla and Charybdis" from Homer’s Odyssey.'
})

const fav2 = new FavoriteModel({
  title: 'M57: The Ring Nebula',
  url: 'https://apod.nasa.gov/apod/image/1306/m57_hst900c.jpg',
  date: '2013-06-05',
  explanation: "cept for the rings of Saturn, the Ring Nebula (M57) is probably the most famous celestial band. Its classic appearance is understood to be due to our own perspective, though. The recent mapping of the expanding nebula's 3-D structure, based in part on this clear Hubble image, indicates that the nebula is a relatively dense, donut-like ring wrapped around the middle of a football-shaped cloud of glowing gas. The view from planet Earth looks down the long axis of the football, face-on to the ring. Of course, in this well-studied example of a planetary nebula, the glowing material does not come from planets. Instead, the gaseous shroud represents outer layers expelled from the dying, once sun-like star, now a tiny pinprick of light seen at the nebula's center. Intense ultraviolet light from the hot central star ionizes atoms in the gas. In the picture, the blue color in the center is ionized helium, the cyan color of the inner ring is the glow of hydrogen and oxygen, and the reddish color of the outer ring is from nitrogen and sulfur. The Ring Nebula is about one light-year across and 2,000 light-years away."
})
await fav1.save()
await fav2.save()
console.log("-----FAVORITES INSERTED-----")

db.close();