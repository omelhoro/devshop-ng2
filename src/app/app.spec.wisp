(def ng-test (require "@angular/core/testing"))
(def App (.-App (require "./app.component")))
(def AppState (.-AppState (require "./app.service")))

(defn before-each-p []
  [AppState App])

(defn suite []
  (do
    (before-each-providers before-each-p)
    (it "should have a url"
        (ng-test.inject [App]
                (fn [app]
                  (-> app.url (expect) (.toEqual "https://devshop-ng2.igor-fischer.rocks")))))))

(describe "App-Container" suite)
