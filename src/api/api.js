import axios from "axios";

const endpoint = `https://jsonplaceholder.typicode.com`;

const getData = async (url, callback, errorCallback) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    callback(response);
  } catch (error) {
    console.log("error = " + error);
    errorCallback(error);
  }
};

const postData = async (url, body, callback, errorCallback) => {
  axios({
    method: "post",
    url: url,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: body,
  })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      errorCallback(error);
    });
};

const putData = async (url, body, callback, errorCallback) => {
  axios({
    method: "put",
    url: url,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: body,
  })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      errorCallback(error);
    });
};

const deleteData = async (url, callback, errorCallback) => {
  axios({
    method: "delete",
    url: url,
  })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      errorCallback(error);
    });
};

export const getUsers = (callback, errorCallback) => {
  let url = `${endpoint}/users`;
  getData(url, callback, errorCallback);
};

export const getPosts = (id, callback, errorCallback) => {
  let url = `${endpoint}/users/${id}/posts`;
  getData(url, callback, errorCallback);
};

export const getAlbums = (id, callback, errorCallback) => {
  let url = `${endpoint}/users/${id}/albums`;
  getData(url, callback, errorCallback);
};

export const getPhotos = (id, callback, errorCallback) => {
  let url = `${endpoint}/albums/${id}/photos`;
  getData(url, callback, errorCallback);
};

export const getComments = (id, callback, errorCallback) => {
  let url = `${endpoint}/posts/${id}/comments`;
  getData(url, callback, errorCallback);
};

export const addComment = (id, data, callback, errorCallback) => {
  let body = data;
  let url = `${endpoint}/posts/${id}/comments`;
  postData(url, body, callback, errorCallback);
};

export const updateComment = (id, data, callback, errorCallback) => {
  let body = data;
  let url = `${endpoint}/posts/${id}/comments`;
  putData(url, body, callback, errorCallback);
};

export const deleteComment = (id, callback, errorCallback) => {
  let url = `${endpoint}/posts/1`;
  deleteData(url, callback, errorCallback);
};
