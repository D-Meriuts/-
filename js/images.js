const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
// Аватарка пользователя должна загружаться через поле загрузки файлов в блоке .ad-form__field и показываться в блоке .ad-form-header__preview.
const avatarUpload = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const initialPreviewSrc = avatarPreview.src;

const upLoadImage = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
}

upLoadImage(avatarUpload, avatarPreview);




// Фотография жилья должна загружаться через поле загрузки файлов в блоке .ad-form__upload и показываться в блоке .ad-form__photo
const photoUpload = document.querySelector('.ad-form__upload input[type=file]')
const photoPreview = document.querySelector('.ad-form__photo')

// добавление тега в разметку
let createImg = () => {
  const img = document.createElement('img');
  img.setAttribute('src', 'img/muffin-grey.svg');
  img.setAttribute('width', '40');
  img.setAttribute('height', '44');
  return img
}
photoPreview.append(createImg())


const image = document.querySelector('.ad-form__photo img')

const imagesrc = image.src

upLoadImage(photoUpload, image);

// функция сброса картинок

const resetImages = () => {
  avatarPreview.src = initialPreviewSrc;
  image.src = imagesrc;

};

export {resetImages};
