const dummy = (blogs) => {
    // ...
    return 1
}
const totalLikes = (blogs) => {
   likes = 0
   blogs.forEach(element => {
       likes += element.likes
   });
   return likes;
}
module.exports = {
    dummy,
    totalLikes
}