package com.dineshkb.gnu.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import javax.persistence._
import javax.validation.constraints.NotNull

import scala.beans.BeanProperty

@Entity
@Table(name="TAG")
@JsonIgnoreProperties(ignoreUnknown=true)
class Tag {
  @Id
  @BeanProperty @NotNull
  @Column(name = "no")
  var no: java.lang.String = _
  @BeanProperty
  @Column(name = "description")
  var description: String = _
  @BeanProperty
  @Column(name = "status")
  var status: String = "open"
  @BeanProperty
  @Column(name = "updated_at")
  var updatedAt: java.time.LocalDateTime = java.time.LocalDateTime.now()
}
