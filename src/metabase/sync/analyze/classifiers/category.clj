(ns metabase.sync.analyze.classifiers.category
  "Classifier that determines whether a Field should be marked as a `:type/Category` based on the number of distinct values it has."
  (:require [clojure.tools.logging :as log]
            [metabase.models.field-values :as field-values]
            [metabase.sync
             [interface :as i]
             [util :as sync-util]]
            [schema.core :as s]))

(derive :type/DateTime ::cannot-be-category)
(derive :type/Collection ::cannot-be-category)

(s/defn ^:always-validate infer-is-category :- (s/maybe i/FieldInstance)
  "Classifier that attempts to determine whether FIELD ought to be marked as a Category based on its distinct count."
  [field :- i/FieldInstance, fingerprint :- (s/maybe i/Fingerprint)]
  (when-not (:special_type field)
    (when fingerprint
      (when-not (isa? (:base_type field) ::cannot-be-category)
        (when-let [distinct-count (get-in fingerprint [:global :distinct-count])]
          (when (< distinct-count field-values/low-cardinality-threshold)
            (log/debug (format "%s has %d distinct values. Since that is less than %d, we're marking it as a category."
                               (sync-util/name-for-logging field)
                               distinct-count
                               field-values/low-cardinality-threshold))
            (assoc field
              :special_type :type/Category)))))))