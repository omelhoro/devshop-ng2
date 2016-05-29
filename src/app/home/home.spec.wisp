(def ngcore (require "@angular/core"))
(def ngcore-test (require "@angular/core/testing"))
(def http (require "@angular/http"))
(def http-test (require "@angular/http/testing"))
(def service (require "../app.service"))
(def Home (.-Home (require "./home.component")))
(def title (require "./title"))



(defn before-each-p [] [http.Base-Request-Options
                        http-test.Mock-Backend
                        {:provide http.Http
                         :useFactory (fn [backend, defaultOptions] (new http.Http backend defaultOptions))
                         :deps [http-test.MockBackend http.BaseRequestOptions]}
                        service.AppState
                        title.Title
                        Home])

(defn suite []
  (do
    (beforeEachProviders before-each-p)

    (it "should have a title"
        (inject [Home]
                (fn [home]
                  (-> (Boolean home.title) (expect) (.toEqual true)))))

    (it "should have default data"
        (inject [Home]
                (fn [home]
                         (-> home (.-local-state) (expect) (.-not) (.toEqual {:value ""})))))

    (it "should log ngOnInit"
        (inject [Home] (fn [home]
                         (do
                           (spyOn console "log")
                           (.not.toHaveBeenCalled (expect console.log))
                           (.ngOnInit home)
                           (.toHaveBeenCalled (expect console.log))))))))

(describe "Home" suite)
