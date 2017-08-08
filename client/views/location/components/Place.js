/* global window document FileReader FormData */
/* eslint global-require: 0, import/no-extraneous-dependencies: 0, import/no-unresolved: 0 */
/* eslint comma-dangle: ["error", "ignore"] */
import $ from 'jquery';
import placeTemplate from 'place.hbs';
import placeFormTemplate from 'placeForm.hbs';
import reviewTemplate from 'review.hbs';
import { DOM } from '../controllers/UIController';
import APIController from '../controllers/APIController';

export default class Place {
  constructor(place, index) {
    this.index = index;
    this.isPlaceholder = !place;
    this.hasReviews = (place) ? place.reviews.length > 0 : false;
    this.place = place || this.placeholderData();
    this.$element = $(placeTemplate(this));
  }

  placeholderData() { // eslint-disable-line
    return {
      name: 'Lorem ipsum dolor',
      description: `
      Lorem ipsum dolor sit amet
      Fusce eu nibh accumsan
      Integer eget diam tempor
      Praesent a lacus eu metus`,
    };
  }

  createPlace() {
    const name = this.$element.find('#name').val();
    const description = this.$element.find('#description').val();
    const data = new FormData();
    data.set('name', name);
    data.set('description', description);

    if (!this.photo) {
      return APIController.createPlace(data);
    }

    return this.getBase64(this.photo)
      .then((photo) => {
        data.set('photo', photo);
        return APIController.createPlace(data);
      });
  }

  getBase64(file) { // eslint-disable-line
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        console.error('Error: ', error);
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  addPhoto(file) {
    if (!file) {
      return;
    }

    const img = document.createElement('img');
    this.photo = file;

    img.src = window.URL.createObjectURL(file);
    img.onload = () => window.URL.revokeObjectURL(img.src);

    this.$element.find('.card-image').html(img).removeClass('hide');
  }

  updateReviewButton() {
    const $badge = this.$element.find(`${DOM.placeReviewsBtn} .badge`);
    const currentNumber = parseInt($badge.text(), 10);
    $badge.text(currentNumber + 1);
  }

  submitReview() {
    const review = this.$element.find('#review').val();
    APIController.submitReview(this.place.id, review)
      .then(this.appendReview.bind(this))
      .then(this.updateReviewButton.bind(this))
      .catch(console.error);
  }

  appendReview(review) {
    this.$element.find(`${DOM.placeReviews} ul`).append(reviewTemplate(review));
  }

  toForm() {
    const $form = $(placeFormTemplate(this));
    this.$element.replaceWith($form);
    this.$element = $form;
    this.$element.find('input').first().focus();
  }

  cancelForm() {
    const $place = $(placeTemplate(this));
    this.$element.replaceWith($place);
    this.$element = $place;
    this.photo = null;
  }

  toggleReviewForm() {
    this.$element.find(DOM.placeReviewForm).toggleClass(`${DOM.placeReviewForm.slice(1)}--active`);
  }

  toggleReviews() {
    this.$element.find(`${DOM.placeReviews} ul`).toggleClass('hide');
  }

  delete() {
    return APIController.deletePlace(this.place.id);
  }
}
