var thumbUp = document.getElementsByClassName('fa-thumbs-up');
var dislike = document.getElementsByClassName('fa-thumbs-down');
var trash = document.getElementsByClassName('fa-trash');
const deleteButtons = document.querySelectorAll('.delete');

//FUNCTIONALITY FOR DELETE BUTTON CLICK EVENT
deleteButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const id = button.dataset.id;
    const plantRecord = button.closest('.plant');

    try {
      const response = await fetch(`delete/${id}`, { method: 'DELETE' });

      if (response.ok) {
        console.log('Successful deletion of plant record.');
        plantRecord.remove();
      } else {
        console.log('Could not find the plant record, check the ID');
        alert('Unable to delete this plant record');
      }
    } catch (err) {
      console.error(err);
      alert('Backend error. Plant record not found.');
    }
  });
});
