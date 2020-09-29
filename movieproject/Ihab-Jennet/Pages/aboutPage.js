// this class has methods that render content in the page

class AboutPage {
    static container = document.getElementById("container");
    static renderAboutPage() {
        this.container.innerHTML = `<div class="about">
            <h3>Movie Website</h3>
            <p>This website is an online database of actors and movies, which you can sort by genres, rating and popularity.</p>
            <h3>Contact us:</h3>
            <div class="flexGitHubNames">
                <div>
                    <p class="h3">Jennet: <a target="_blank" href="https://github.com/jennethydyrova" class ="badge badge-info">Github</a></p>
                </div>
                <div>
                    <p class="h3">Ihab: <a target="_blank" href="https://github.com/ihab-sensei" class ="badge badge-info">Github</a></p>
                </div>
            </div>
        </div>`
    }
}
