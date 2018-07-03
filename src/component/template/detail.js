export default function (item) {
  const {
    title,
    description,
    skills,
    images,
    url,
  } = item
  const skillsTpl = skills
    .map(skill => `<li>${skill}</li>`)
    .join('')
  const imagesTpl = images
    .map(image => `<img src="${image}" />`)
    .join('')
  const urlTpl = url
    .map((u) => {
      if (typeof u === 'object') {
        const k = Object.keys(u)[0]
        const v = Object.values(u)[0]
        return `<a href="${v}" target="_blank">${k}</a>`
      }
      if (u.indexOf('.png') > -1 || u.indexOf('.jpg') > -1) {
        return `<img src="${u}" />`
      }
      return `<a target="_blank" href="${u}">${u}</a>`
    })
    .join('')
  const descriptionTpl = Array.isArray(description)
    ? description.map(d => `<p>${d}</p>`).join('') : `<p>${description}</p>`

  return `
    <div class="detail">
      <h2>${title}</h2>
      <div class="info">
        <ul>${skillsTpl}</ul>
        <div>${descriptionTpl}</div>
      </div>
      <div class="url">${urlTpl}</div>
      <div class="images">${imagesTpl}</div>
    </div>
  `
}
