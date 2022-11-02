import getPublicUrl from '../utilities/aws-sdk';
import { useState } from 'react';
import axios from 'axios';

const Form = () => {

  const [processing, setProcessing] = useState(false);

  const moveToLocation = (e) => {
    e.preventDefault();
  }
  const moveToAmmenities = (e) => {
    e.preventDefault();
  }
  const submitForm = async (e) => {
    e.preventDefault();
    setProcessing(true);

    let name = document.querySelector('#name').value.trim();
    let description = document.querySelector('#description').value.trim();
    let country = document.querySelector('#country').value.trim();
    let streetAddress = document.querySelector('#street-address').value.trim();
    let city = document.querySelector('#city').value.trim();
    let state = document.querySelector('#region').value.trim();
    let postalCode = document.querySelector('#postal-code').value.trim();

    let amenities = [];
    if (document.querySelector('#lounge').checked) amenities.push('lounge');
    if (document.querySelector('#locker').checked) amenities.push('locker');
    if (document.querySelector('#sauna').checked) amenities.push('sauna');
    if (document.querySelector('#wifi').checked) amenities.push('wifi');

    let type;
    if (document.querySelector('#body-building').checked) type = 'Body building';
    if (document.querySelector('#mma').checked) type = 'MMA';
    if (document.querySelector('#judo').checked) type = 'Judo';


    let logo = '', images = [];
    try {

      // upload logo
      const logoUpload = document.querySelector('#logo-upload');
      const logoImg = logoUpload.files[0];
      if (logoImg) {
        logo = await getPublicUrl(logoImg);
      }

      // upload cover photos
      const fileUpload = document.querySelector('#file-upload');
      const files = fileUpload.files;
      if (files) {
        for (let file of files) {
          let location = await getPublicUrl(file);
          images.push(location);
        }
      }

    } catch (err) {
      alert('An error occurred while uploading photos');
      console.log(err);
    }

    let location = '';
    if (streetAddress || city || state || country || postalCode) {
      location = `${streetAddress}, ${city}, ${state}, ${country}, ${postalCode}`;
    }

    // Geocoding
    let coordinates = [];
    if (location) {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: location,
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          }
        })
        let nearestCoordinates = response.data.results[0].geometry.location;
        coordinates.push(nearestCoordinates.lat);
        coordinates.push(nearestCoordinates.lng);
      } catch (err) {
        console.log(err)
        alert('Geocoding for the provided address failed')
      }
    }


    const baseURL = 'https://over-engineered.herokuapp.com'
    const data = { name, description, logo, images, location, amenities, type, coordinates }
    const config = {
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_GYMDB_API_AUTH_HEADER}`
      }
    }
    try {
      await axios.post(`${baseURL}/gyms`, data, config);
      alert('Data uploaded successfully');
    } catch (err) {
      console.log(err);
      alert(`Error: ${err.response.data.message}`)
    }
    setProcessing(false);
  }

  const previewUploadedImages = (event, target) => {
    const files = event.target.files;
    let dropbox;
    if (target === 'coverPhotos') dropbox = document.querySelector('#cover-photos-box');
    if (target === 'logo') dropbox = document.querySelector('#logo-box');

    // empty the dropbox
    if (dropbox.firstChild) {
      while (dropbox.firstChild) {
        dropbox.removeChild(dropbox.firstChild);
      }
    }

    // append <img> elements
    for (let file of files) {
      if (!file.type.startsWith('image')) {
        alert(`${file.name} is not supported. (type: ${file.type})`);
        continue;
      }
      const imgElement = document.createElement('img');
      imgElement.file = file;
      imgElement.className = (target == 'logo') ? 'w-full h-full object-cover' : 'h-24 m-2 inline rounded-md';
      dropbox.appendChild(imgElement);

      let reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;

          // append blob to file used to upload later
          file.blob = dataURItoBlob(e.target.result);
        };
      })(imgElement);
      reader.readAsDataURL(file);
    }
  }

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  return (
    <div className=" px-4 md:px-6 pt-6 2xl:container">
      <div id='add-general-section'>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">General Information</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              onSubmit={moveToLocation}
            >
              <div className="shadow sm:overflow-hidden rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block p-2 w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Example Fitness Gym"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="A crisp description about the gym here"
                        defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Mention the facilities and luxuries provided by the gym
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">

                    {/* dropbox to show uploaded logo */}
                    <div id='logo-box' className='w-12 h-12 bg-slate-50 rounded-full border overflow-hidden'></div>

                    <label
                      htmlFor="logo-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <p className=''>Upload logo</p>
                      <input id="logo-upload" name="logo-upload" type="file" accept="image/*" className="sr-only" onChange={(e) => { previewUploadedImages(e, 'logo') }} />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cover photos</label>

                    {/* dropbox to show uploaded files */}
                    <div id='cover-photos-box' className='my-2 p-2 border-2 rounded-md'></div>

                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex justify-center text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <p className='text-center'>Upload file(s)</p>
                            <input id="file-upload" name="file-upload" type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { previewUploadedImages(e, 'coverPhotos') }} />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <a
                    href="#add-location-section"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Next
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div id="add-location-section" className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Location</h3>
              <p className="mt-1 text-sm text-gray-600">This is how one will reach the gym.</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              onSubmit={moveToAmmenities}
            >
              <div className="overflow-hidden shadow rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <a
                    href='#add-ammenities-section'
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Next
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div id='add-ammenities-section' className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Amenities provided</h3>
              <p className="mt-1 text-sm text-gray-600">Defined the desirable or useful features of the place</p>
            </div>
          </div>

          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              onSubmit={submitForm}
            >
              <div className="overflow-hidden shadow rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                  <fieldset>
                    <legend className="sr-only">Facilities provided</legend>
                    <div className="text-base font-medium text-gray-900" aria-hidden="true">
                      Facilities provided
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="lounge"
                            name="lounge"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="lounge" className="font-medium text-gray-700">
                            Lounge
                          </label>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="locker"
                            name="locker"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="locker" className="font-medium text-gray-700">
                            Locker
                          </label>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="sauna"
                            name="sauna"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="sauna" className="font-medium text-gray-700">
                            Sauna
                          </label>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="wifi"
                            name="wifi"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="wifi" className="font-medium text-gray-700">
                            Wifi
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="contents text-base font-medium text-gray-900">Chose a gym type</legend>
                    <p className="text-sm text-gray-500">Select from different classes, workouts available, and the variety of people you will meet at the gym</p>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="body-building"
                          name="gym-type"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          required
                        />
                        <label htmlFor="body-building" className="ml-3 block text-sm font-medium text-gray-700">
                          Body building
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="mma"
                          name="gym-type"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          required
                        />
                        <label htmlFor="mma" className="ml-3 block text-sm font-medium text-gray-700">
                          MMA
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="judo"
                          name="gym-type"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          required
                        />
                        <label htmlFor="judo" className="ml-3 block text-sm font-medium text-gray-700">
                          Judo
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">

                  {!processing && <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>}
                  {processing && <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 hover:cursor-not-allowed"
                    disabled
                  >
                    <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
                    Processing...
                  </button>}

                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form