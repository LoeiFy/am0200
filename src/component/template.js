export const list = items => items.map(({ title, name, subtitle }) => `
  <div data-name="${name}" class="item">
    <h3>${title}</h3>
    <p>${subtitle}</p>
  </div>
`)

export const detail = (item) => {
  const {
    title,
    description,
    skills,
    images,
    url,
  } = item
  const skillsTpl = skills.map(skill => `<li>${skill}</li>`)
  const imagesTpl = images.map(image => `<img src="${image}" />`)
  const urlTpl = url
    .map((u) => {
      if (u.indexOf('.png') > -1 || u.indexOf('.jpg') > -1) {
        return `<img src="${u}" />`
      }
      return `<a href="${u}">${u}</a>`
    })
    .join('')

  return `
    <div class="detail">
      <h2>${title}</h2>
      <div class="info">
        <ul>${skillsTpl}</ul>
        <p>${description}</p>
      </div>
      <div class="url">${urlTpl}</div>
      <div class="images">${imagesTpl}</div>
    </div>
  `
}
