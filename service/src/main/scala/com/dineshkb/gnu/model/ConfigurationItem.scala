package com.dineshkb.gnu.model

import com.fasterxml.jackson.annotation.{JsonIgnore, JsonIgnoreProperties}
import javax.persistence._

import scala.beans.BeanProperty

@Entity
@Table(name="CONFIGURATION_ITEM")
@JsonIgnoreProperties(ignoreUnknown=true)
class ConfigurationItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @BeanProperty
  @Column(name = "no")
  var no: java.lang.Long = _
  @BeanProperty
  @Column(name = "entity")
  var entity: String = _
  @BeanProperty
  @Column(name = "entity_key")
  var entity_key: String = _
  @BeanProperty
  @Column(name = "version_no")
  var versionNo: String = _
  @BeanProperty
  @Column(name = "change")
  var change: String = _
  @BeanProperty
  @ManyToOne
  @JoinColumn(name = "tag_no")
  @JsonIgnore
  var tag: Tag = _
  @BeanProperty
  @Column(name = "snapshot")
  var snapshot : String = _
  @BeanProperty
  @Column(name = "updated_at")
  var updatedAt: java.time.LocalDateTime = java.time.LocalDateTime.now()
}
