$(document).ready(async function(){
    await LoadTasks()
    
})
$(document).on('click', function(e) {
    const $target = $(e.target);

    if ($target.hasClass('fa-trash')) {
        let index = $target.data('id');
        RemoveTask(index).then(() => LoadTasks());
    }else if ($target.hasClass('editTask')) {
        let index = $target.data('id')
        $('.bg-black').append(`
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 modal">
            <div class="bg-black/70 text-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                <h2 class="text-xl font-semibold mb-4">Your Message</h2>
                <textarea
                    rows="5"
                    placeholder="Edit task"
                    class="w-full p-3 rounded-xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                ></textarea>
                <div class="mt-4 flex justify-end gap-2">
                    <button class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition cancel">Cancel</button>
                    <button class="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition submit" data-id="${index}">Submit</button>
                </div>
            </div>
        </div>`);
    }else if ($target.hasClass('cancel')) {
        $('.modal').remove();
    }else if ($target.hasClass('submit')){
            let index = $target.data('id')
            const modal = $target.closest('.modal');
            const text = modal.find('textarea').val();
             $('.modal').remove();
            EditTask(index,text).then(()=>LoadTasks())
            
    }
});



$('#task').on('keydown', async function (e) {
    if (e.key === 'Enter') {
        let task = $(this).val().trim();
        if (task === '') return; 
        await addTask(task)
        await LoadTasks()
        $(this).val(''); 
    }
});
async function addTask(task) {
    try{
        let tasks = JSON.parse(localStorage.getItem('TaskList') || '[]');
        tasks.push(task);
        localStorage.setItem('TaskList', JSON.stringify(tasks));
        $('.SucessNot').text('Add Task completed successfully.')
        $('.SucessNot').fadeIn('slow').delay(1500).fadeOut('slow');
    }catch{
        $('.FailNot').fadeIn('slow').delay(1500).fadeOut('slow');
    }
 

}

async function LoadTasks() {
        let TaskList = JSON.parse(localStorage.getItem('TaskList') || '[]')
        $('#taskList').empty();
        for(let i = 0 ;i< TaskList.length; i++){
        let taskDiv = $(`<div class="text-xl w-full glass-bg p-12 placeholder-white focus:outline-none bg-transparent text-white resize-none overscroll-contain mt-[5vh]">
            <div class="absolute bottom-4 right-4">
                <i class="fa-solid fa-pencil text-white text-base editTask" data-id="${i}"></i>
                <i class="fa-solid fa-trash text-white text-base " data-id="${i}"></i>
            </div>
         </div>`)
        let task = $(`<div class="text-xl placeholder-white focus:outline-none bg-transparent text-white resize-none overscroll-contain "></div>`).text(TaskList[i])
        let taskElement = taskDiv.prepend(task)
        $(`#taskList`).prepend(taskElement)
        }
}
async function RemoveTask(index) {
    try{
        let tasks = JSON.parse(localStorage.getItem('TaskList') || '[]')
        tasks.splice(index,1)
        localStorage.setItem('TaskList', JSON.stringify(tasks));  
        $('.SucessNot').text('Remove Task completed successfully.')
        $('.SucessNot').fadeIn('slow').delay(1500).fadeOut('slow');
    }catch{
        $('.FailNot').fadeIn('slow').delay(1500).fadeOut('slow');
    }
}

async function EditTask(index,NewText) {
    try{
        let tasks = JSON.parse(localStorage.getItem('TaskList') || '[]')
        tasks[index] = NewText
        localStorage.setItem('TaskList', JSON.stringify(tasks));  
        $('.SucessNot').text('Edit Task completed successfully.')
        $('.SucessNot').fadeIn('slow').delay(1500).fadeOut('slow');
    }catch{
        $('.FailNot').fadeIn('slow').delay(1500).fadeOut('slow');
    }
}