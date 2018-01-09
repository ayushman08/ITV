export const selectUser = (user) => {
    console.log('You clicked on user: ', user.name);
    return {
        type: 'USER_SELECTED',
        payload: user
    };
};

export const selectImage = (ImagePath) => {
    console.log('You clicked on user: ', ImagePath);
    return {
        type: 'IMAGE_SELECTED',
        payload: ImagePath
    };
};
