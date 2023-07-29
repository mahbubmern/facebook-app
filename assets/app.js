const post_from = document.getElementById('post_from');
const edit_post_from = document.getElementById('edit_post_from');
const allPost = document.querySelector('.all-post');
const noPostMessage = document.querySelector('.noPostMessage');
const postDelete = document.querySelector('.postDelete');

const getAllLsData = () => {
	let allData = JSON.parse(localStorage.getItem('posts'));

	if (allData) {
		let content = '';
		allData.map((item, index) => {
			let agoTime = timeAgo(item.timeStamps);
			content += `<div class="timeline shadow-sm my-3">
      <div class="card">
        <div class="card-body">
          <div class="user-info">
            <img src="${item.author_photo}" alt="">
            <div class="info-details">
              <span>${item.author_name}</span>
              <span>${agoTime} <i class="fas fa-globe-asia"></i></span>
            </div>
          </div>
          <div class="dropdown">
            <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
              <i class="fas fa-ellipsis-h"></i>
            </a>
      
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item post_edit "  item_index=${index} data-bs-toggle="modal"  href="#edit_post_modal">Edit</a></li>
              <li><a class="dropdown-item post_delete " item_index=${index} data-bs-toggle="modal"  href="#delete_post_modal">Delete</a></li>
            </ul>
          </div>
      
        </div>
        <div class="post-content my-2">
          <p>${item.content}</p>
        </div>
        <div class="post-content-image my-2">
          <img class="w-100 mb-3" src="${item.content_photo}" alt="">
        </div>
        
        <div class="postShareSection">
          <p><img src="../images/2764.png" alt=""> <img src="../images/1f642.png" alt="">Simki,Fariha,Kasfiya,Munira and 3 others Likes </p><p>1.2k comments</p>
        </div>

        <div class="likeCommentShare">
          <div class="likes">
            <a href="#"><i class="fas fa-thumbs-up"></i><span>Likes</span></a>
            
          </div>
          <div class="comments">
            <a href="#"><i class="fas fa-message"></i><span>Comments</span></a>
            
          </div>
          <div class="share">
            <a href="#"><i class="fas fa-share-from-square"></i><span>Share</span></a>
            
          </div>
        </div>

      </div>
      
      
      </div>`;
		});
		allPost.innerHTML = content;
	} else {
		noPostMessage.innerHTML = `No Post Found`;
	}
};

getAllLsData();

post_from.onsubmit = (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	const { author_name, author_photo, content, content_photo } = data;

	sendDataLS('posts', {
		author_name,
		author_photo,
		content,
		content_photo,
		timeStamps: time(),
	});
	getAllLsData();
	e.target.reset();
};

allPost.onclick = (e) => {
	e.preventDefault();
	if (e.target.classList.contains('post_edit')) {
		let index = e.target.getAttribute('item_index');

		let allData = JSON.parse(localStorage.getItem('posts'));
		const { author_name, author_photo, content, content_photo } =
			allData[index];

		edit_post_from.innerHTML = `<div class="my-2">
    <input class="form-control"  type="text" value="${author_name}" name="author_name" placeholder="Author Name">
  </div>

  <div class="my-2">
    <input class="form-control" type="text" value="${author_photo}" name="author_photo" placeholder="Author Photo URL">
  </div>

  <div class="my-2">
    <textarea class="form-control"  name="content" id="" cols="30" rows="5" placeholder="Write Content">${content}</textarea>
  </div>

  <div class="my-2">
    <input class="form-control" value="${content_photo}" type="text" name="content_photo" placeholder="Content Photo URL">
  </div>
  <div class="my-2">
    <input class="form-control"  value="${index}" type="hidden" name="index" placeholder="Index">
  </div>

  <div class="my-2">
    <button type="submit"  class=" w-100 btn btn-sm btn-success ">Create</button>
  </div>`;
	}
	if (e.target.classList.contains('post_delete')) {
		let index = e.target.getAttribute('item_index');

		let allData = JSON.parse(localStorage.getItem('posts'));
		postDelete.innerHTML = `<button class="btn btn-sm btn-danger" data-bs-dismiss="modal" onclick="deleteItem()">Yes</button>
                           <button class="btn btn-sm btn-success" data-bs-dismiss="modal">No</button>`;

		deleteItem = () => {
			allData.splice(index, 1);
			update('posts', allData);
			getAllLsData();

		};
	}
};

edit_post_from.onsubmit = (e) => {
	e.preventDefault();

	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());

	const { author_name, author_photo, content, content_photo, index } = data;

	let allData = JSON.parse(localStorage.getItem('posts'));
	let newTime = allData[index].timeStamps;

	allData[index] = {
		author_name,
		author_photo,
		content,
		content_photo,
		timeStamps: newTime,
	};

	update('posts', allData);
	getAllLsData();
};
