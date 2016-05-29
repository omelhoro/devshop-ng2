(def About (.-About (require "./about.component.ts")))

(defn before-each-p []
  [About])

(defn suite []
  (do
    (before-each-providers before-each-p)
    (it "should log ngOnInit"
        (inject [About] (fn [about]
                          (do
                            (spyOn console :log)
                            (-> console.log (expect) (.-not) (.toHaveBeenCalled))
                            (about.ngOnInit)
                            (-> console.log (expect) (.toHaveBeenCalled))
                            ))))
    ))

(describe "About-Component" suite)
